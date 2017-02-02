import Router from 'koa-router';

import database from '../database';

const Product = database.models.Product;

const productRouter = new Router();

productRouter.get('/product', async (ctx, next) => {
  console.log(ctx.query);
  const {
    query,
    category,
    type,
    brand,
    size,
    color,
    orderByField,
    orderAscending,
  } = ctx.query;

  const products = await Product.findAll({
    where: {
      $or: [
        {
          name: {
            $like: `%${query}%`,
          },
        },
        {
          description: {
            $like: `%${query}%`,
          },
        },
      ],
    },
    order: [
      [orderByField, !!Number(orderAscending) ? 'ASC' : 'DESC'],
    ],
  });
  // ctx.body = 'You\'re on a product detail page!';
  ctx.body = products;
});

productRouter.post('/product'), async (ctx, next) => {
  
}

export default productRouter;
