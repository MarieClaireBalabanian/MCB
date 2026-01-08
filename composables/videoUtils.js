export const getVideoAspectRatio = (videoHtml) => {
  if (!videoHtml) return '56.25%';

  const widthMatch = videoHtml.match(/width=["']?(\d+)["']?/);
  const heightMatch = videoHtml.match(/height=["']?(\d+)["']?/);

  if (widthMatch && heightMatch) {
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    return `${(height / width) * 100}%`;
  }

  return '56.25%';
};

