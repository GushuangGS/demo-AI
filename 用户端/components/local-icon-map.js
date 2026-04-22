const iconModules = import.meta.glob('../static/icons/*.png', { eager: true });

export const localIconMap = Object.freeze(
  Object.keys(iconModules).reduce((map, path) => {
    const name = path.split('/').pop().replace('.png', '');
    map[name] = iconModules[path].default || iconModules[path];
    return map;
  }, {}),
);
