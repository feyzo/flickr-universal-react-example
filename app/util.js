export function getPropsFromRoute({ routes }, componentProps) {
  let props = {};
  const lastRoute = routes[routes.length - 1];

  routes.reduceRight((prevRoute, currRoute) => {
     
    componentProps.forEach(componentProp => {
      if (!props[componentProp] && currRoute.component[componentProp]) {
        props[componentProp] = currRoute.component[componentProp];
      }
    });
    
  }, lastRoute);

  return props;
}

export const isClient = (typeof document !== 'undefined');