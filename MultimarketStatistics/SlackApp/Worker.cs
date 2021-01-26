using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MoreLinq;
using Slack.Webhooks;

namespace SlackApp
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly NotificationService notificationService;
        private readonly UserService userService;

        public Worker(ILogger<Worker> logger, NotificationService notificationService, UserService userService)
        {
            _logger = logger;
            this.notificationService = notificationService;
            this.userService = userService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                var usersWithSlack = userService.GetAllWithSlackCredentials();

                var notificationsByUser = notificationService
                    .GetNotCheckedNotificationsByUsers(usersWithSlack
                        .Select(u => u.Id)
                        .ToArray())
                    .GroupBy(n => n.User.Id)
                    .ToDictionary(g => g.Key, g => g.ToArray());

                foreach (var user in usersWithSlack)
                {
                    try
                    {
                        using var slackClient = new SlackClient(user.SlackCredentials);
                        var messages = notificationsByUser[user.Id].Select(n => new SlackMessage {Text = n.Text});
                        messages.ForEach(m => slackClient.Post(m));
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }

                _logger.LogInformation("Worker finished sending messages at: {time}", DateTimeOffset.Now);
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken).ConfigureAwait(false);
            }
        }
    }
}