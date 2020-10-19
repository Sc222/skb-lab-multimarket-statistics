using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Storage.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity: class
    {
        private readonly ContextFactory contextFactory;

        public Repository(ContextFactory contextFactory)
        {
            this.contextFactory = contextFactory;
        }

        public TEntity Get(params object[] keyValues)
        {
            var context = contextFactory.Create();
            return context.Set<TEntity>().Find(keyValues);
        }

        public TEntity[] GetAll()
        {
            var context = contextFactory.Create();
            return context.Set<TEntity>().ToArray();
        }

        public TEntity[] Find(Expression<Func<TEntity, bool>> predicate)
        {
            var context = contextFactory.Create();
            return context.Set<TEntity>().Where(predicate).ToArray();
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            var context = contextFactory.Create();
            return context.Set<TEntity>().SingleOrDefault(predicate);
        }

        public void Delete(Guid id)
        {
            var context = contextFactory.Create();
            var entity = context.Set<TEntity>().Find(id);
            Delete(entity);
        }

        public void Delete(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Deleted;
            context.SaveChanges();
        }

        public void Create(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Added;
            context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
