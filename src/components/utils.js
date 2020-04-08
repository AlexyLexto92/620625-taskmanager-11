export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
export const tagRandom = (tagArr, tagsStart, tagsEnd, tagsCounts)=>{
  const startCount = randomInteger(tagsStart, tagsEnd);
  const tagsNewArray = tagArr.slice(startCount, startCount + tagsCounts);
  return tagsNewArray;
};
