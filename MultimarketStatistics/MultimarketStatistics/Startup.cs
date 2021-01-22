using AutoMapper;
using Domain.Clients.AppGallery;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MultimarketStatistics.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Storage;
using Storage.Repositories;

namespace MultimarketStatistics
{
    public class Startup
    {
        private readonly string MultimarketAllowSpecificOrigins = "_multimarketAllowSpecificOrigins";


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //todo replace * with normal origins list and make normal headers and methods list
            services.AddCors(options =>
            {
                options.AddPolicy(MultimarketAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("*")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddControllers(options =>
                {
                    options.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
                    options.ReturnHttpNotAcceptable = true;
                    options.RespectBrowserAcceptHeader = true;
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                    options.SuppressMapClientErrors = true;
                })
                .AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    o.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    o.SerializerSettings.Formatting = Formatting.None;
                    o.SerializerSettings.Converters.Add(new StringEnumConverter(new CamelCaseNamingStrategy()));
                });

            services.AddSwaggerGen();


            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile<ContractsMappingProfile>());
            services.AddSingleton(mapperConfig.CreateMapper());

            services.AddScoped<UserService>();
            services.AddScoped<ReviewService>();
            services.AddScoped<RatingService>();
            services.AddScoped<AppService>();
            services.AddScoped<NotificationService>();
            services.AddScoped<FetcherService>();

            services.AddScoped<AppGalleryClient>()
                .AddScoped<AppStoreClient>()
                .AddScoped<PlayMarketClient>();

            services.AddScoped(typeof(DbContext), typeof(StorageContext))
                .AddScoped<ContextFactory>()
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddEntityFrameworkProxies();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            //app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Multimarket API"));

            app.UseRouting();

            app.UseCors(MultimarketAllowSpecificOrigins);

            app.UseMiddleware<JwtMiddleware>();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}