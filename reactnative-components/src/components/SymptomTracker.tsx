import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Define severity level types
type SeverityLevel = 'Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe';

interface DataPoint {
  date: string;
  severity: SeverityLevel;
}

interface SeverityTrackerProps {
  data?: DataPoint[];
}

const severityLevels: Record<SeverityLevel, number> = {
  'Minimal': 1,
  'Mild': 2,
  'Moderate': 3,
  'Moderately Severe': 4,
  'Severe': 5,
};

const defaultData: DataPoint[] = [
  { date: '2023-12-22', severity: 'Severe' },
  { date: '2023-12-31', severity: 'Mild' },
];

const SeverityTracker: React.FC<SeverityTrackerProps> = ({ data = [] }) => {
  const chartData = data.length ? data : defaultData;

  const formatData = () => {
    return {
      labels: chartData.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
      }),
      datasets: [{
        data: chartData.map(item => severityLevels[item.severity]),
        color: (opacity = 1) => `rgba(102, 51, 204, ${opacity})`,
        strokeWidth: 2,
      }],
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Timeframe tabs commented out */}
      </View>
      
      <LineChart
        data={formatData()}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(102, 51, 204, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#6633cc',
          },
          propsForBackgroundLines: {
            strokeDasharray: '6, 6',
            stroke: 'rgba(128, 128, 128, 0.2)',
          },
        }}
        bezier
        style={styles.chart}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        segments={5}
        formatYLabel={(value: string | number): string => {
          const numberValue = Number(value);
          const levels: string[] = ['', 'Minimal', 'Mild', 'Moderate', 'Moderately Severe', 'Severe'];
          return numberValue >= 0 && numberValue < levels.length ? levels[numberValue] : '';
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  timeframeTab: {
    backgroundColor: '#6633cc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  timeframeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  timeframeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  timeframeOptionText: {
    color: '#666666',
    fontSize: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default SeverityTracker;