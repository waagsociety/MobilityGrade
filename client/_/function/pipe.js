export const pipe = (...pipeline) => value => 
  pipeline.reduce((value, transform) => transform(value), value)