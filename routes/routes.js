import { flatten } from 'lodash';
import { StaticMessageRoutes } from './route-builders/static-message-routes';
import { DynamicCommandsRoutes } from './route-builders/dynamic-commands-routes';

export const staticRoutes = [];
export const routeBuilders = [
  StaticMessageRoutes,
  DynamicCommandsRoutes,
];

export const getRoutes = async (attrs) => {
  const dynamicRoutes = flatten(
    await Promise.all(routeBuilders.map(async (rb) => rb.getRoutes(attrs))),
  );
  return [
    ...staticRoutes,
    ...dynamicRoutes,
  ];
};
