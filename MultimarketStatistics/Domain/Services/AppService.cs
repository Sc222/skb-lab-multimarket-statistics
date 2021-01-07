using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class AppService
    {
        private readonly IRepository<App> appRepository;
        //private readonly FetcherService

        public AppService(IRepository<App> appRepository)
        {
            this.appRepository = appRepository;
        }

        public Guid Create(App app)
        {
            appRepository.Create(app);
            return app.Id;
        }

        public App Get(Guid id)
        {
            return appRepository.Get(id);
        }

        public App[] GetAppsByUser(Guid userId)
        {
            return appRepository.Find(a => a.User.Id == userId);
        }

        public App[] GetAll()
        {
            return appRepository.GetAll(true);
        }

        public void Update(App app)
        {
            appRepository.Update(app);
        }

        public void Delete(App app)
        {
            appRepository.Delete(app);
        }
    }
}
