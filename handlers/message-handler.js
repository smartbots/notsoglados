import { getRoutes } from '../routes/routes';

export const onMessageHandler = async ({
  client, target, context, msg, self,
}) => {
  if (self) {
    return;
  }
  const routes = await getRoutes({ target });
  const route = (routes || [])
    .find((r) => r.channel
      && (
        (r.regex && (msg || '').match(r.regex))
        || (
          r.canBeProcessed
          && typeof r.canBeProcessed === 'function'
          && r.canBeProcessed({ context, target, msg })
        )
      )
      && r.handler
      && (r.channel.match(/^#/) ? r.channel : `#${r.channel}`));

  if (!route) {
    return;
  }

  route.handler({
    client, target, context, msg,
  });
};
