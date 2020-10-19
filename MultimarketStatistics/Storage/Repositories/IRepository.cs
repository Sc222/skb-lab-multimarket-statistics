using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Storage.Entities;

namespace Storage.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(params object[] keyValues);

        TEntity[] GetAll();

        TEntity[] Find(Expression<Func<TEntity, bool>> predicate);

        TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        void Create(TEntity entity);

        void Update(TEntity entity);

        void Delete(Guid id);

        void Delete(TEntity entity);
    }
}
