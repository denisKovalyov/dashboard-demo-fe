import type { Widget, ChartData } from '@/modules/dashboard/types.ts';

export function adaptChartData(widget: Widget) {
  const { labels, datasets } = widget.data as ChartData;

  // Shorten dates: "10/23/2025" → "10/23"
  const shortLabels = labels.map((label) => {
    const parts = label.split('/');
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}`;
    }
    return label;
  });

  const chartData = shortLabels.map((label, i) => {
    const entry: Record<string, number | string> = { label };
    datasets.forEach((ds) => {
      entry[ds.label] = ds.data[i];
    });
    return entry;
  });

  const chartConfig = Object.fromEntries(datasets.map((ds) => [ds.label, { label: ds.label }]));

  const title = `${Object.keys(chartConfig)[0]} Chart`;
  const description = `${labels[0]} - ${labels[labels.length - 1]}`;

  return { chartData, chartConfig, title, description };
}
