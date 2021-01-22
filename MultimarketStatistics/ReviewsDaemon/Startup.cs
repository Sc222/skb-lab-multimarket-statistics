using Domain.Clients.AppGallery;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Storage;
using Storage.Repositories;

namespace ReviewsDaemon
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<UserService>();
            services.AddScoped<ReviewService>();
            services.AddScoped<RatingService>();
            services.AddScoped<AppService>();
            services.AddScoped<NotificationService>();
            services.AddScoped<FetcherService>();

            services.AddScoped(typeof(DbContext), typeof(StorageContext))
                .AddScoped<ContextFactory>()
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddEntityFrameworkProxies();

            services.AddScoped<AppGalleryClient>();
            services.AddScoped<AppStoreClient>();
            services.AddScoped<PlayMarketClient>();

            services.AddHostedService<Worker>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}