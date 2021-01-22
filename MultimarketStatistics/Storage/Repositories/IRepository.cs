using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Storage.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(params object[] keyValues);

        TEntity[] GetAll(bool eager = false);

        TEntity[] Find(Expression<Func<TEntity, bool>> predicate, bool eager = false);

        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        void Create(TEntity entity);

        void CreateRange(IEnumerable<TEntity> entities);

        void Update(TEntity entity);

        void Delete(Guid id);

        void Delete(TEntity entity);

        void DeleteRange(IEnumerable<TEntity> entities);
    }
}