function calculateETA(items) {
  let base = 5;

  items.forEach(i => {
    base += i.prepTime;
  });

  const rushFactor = items.length * 2;

  return base + rushFactor;
}

module.exports = { calculateETA };
