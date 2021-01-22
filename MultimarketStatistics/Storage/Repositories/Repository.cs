using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MoreLinq;

namespace Storage.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
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

        public TEntity[] GetAll(bool eager = false)
        {
            var context = contextFactory.Create();
            var query = LoadEntities(context, eager);
            return query.ToArray();
        }

        public TEntity[] Find(Expression<Func<TEntity, bool>> predicate, bool eager = false)
        {
            var context = contextFactory.Create();
            var query = LoadEntities(context, eager);
            return query.Where(predicate).ToArray();
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
            context.Entry(entity).State = EntityState.Deleted;
            context.SaveChanges();
        }

        public void Delete(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Deleted;
            context.SaveChanges();
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            var context = contextFactory.Create();
            entities.ForEach(e => context.Entry(e).State = EntityState.Deleted);
            context.SaveChanges();
        }

        public void Create(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Added;
            context.SaveChanges();
        }

        public void CreateRange(IEnumerable<TEntity> entities)
        {
            var context = contextFactory.Create();
            entities.ForEach(e => context.Entry(e).State = EntityState.Added);
            context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            var context = contextFactory.Create();
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

        private IQueryable<TEntity> LoadEntities(DbContext context, bool eager = false)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();
            if (eager)
                foreach (var property in context.Model.FindEntityType(typeof(TEntity)).GetNavigations())
                    query = query.Include(property.Name);

            return query;
        }
    }
}