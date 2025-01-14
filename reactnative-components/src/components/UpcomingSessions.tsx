import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { format } from 'date-fns';

interface Session {
  id: string;
  date: Date;
  duration: string;
  doctorName: string;
  type: string;
  status: 'confirmed' | 'pending';
}

interface StatusColors {
  backgroundColor: string;
  textColor: string;
}

interface StatusColorsMap {
  confirmed: StatusColors;
  pending: StatusColors;
}

interface CustomStyles {
  container?: ViewStyle;
  title?: TextStyle;
  sessionsContainer?: ViewStyle;
  dateHeader?: ViewStyle;
  dateText?: TextStyle;
  sessionCard?: ViewStyle;
  timeContainer?: ViewStyle;
  time?: TextStyle;
  duration?: TextStyle;
  sessionInfo?: ViewStyle;
  doctorName?: TextStyle;
  sessionType?: TextStyle;
  statusBadge?: ViewStyle;
  statusText?: TextStyle;
}

interface UpcomingSessionsProps {
  sessions?: Session[];
  title?: string;
  styles?: CustomStyles;
  statusColors?: StatusColorsMap;
  onSessionPress?: (session: Session) => void;
  dateFormat?: string;
  timeFormat?: string;
  renderCustomHeader?: (date: Date) => React.ReactNode;
  renderCustomSessionCard?: (session: Session) => React.ReactNode;
}

const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ 
  sessions = [], 
  title = "Upcoming Sessions",
  styles,
  statusColors = {
    confirmed: {
      backgroundColor: '#9F7AEA',
      textColor: '#fff'
    },
    pending: {
      backgroundColor: '#E9D8FD',
      textColor: '#805AD5'
    }
  },
  onSessionPress,
  dateFormat = 'EEEE, MMMM d',
  timeFormat = 'h:mm a',
  renderCustomHeader,
  renderCustomSessionCard
}) => {
  const renderSessionCard = ({ item }: { item: Session }) => {
    if (renderCustomSessionCard) {
      return renderCustomSessionCard(item);
    }

    const timeString = format(item.date, timeFormat);

    return (
      <TouchableOpacity 
        style={[defaultStyles.sessionCard, styles?.sessionCard]}
        onPress={() => onSessionPress?.(item)}
      >
        <View style={[defaultStyles.timeContainer, styles?.timeContainer]}>
          <Text style={[defaultStyles.time, styles?.time]}>{timeString}</Text>
          <Text style={[defaultStyles.duration, styles?.duration]}>{item.duration}</Text>
        </View>
        <View style={[defaultStyles.sessionInfo, styles?.sessionInfo]}>
          <Text style={[defaultStyles.doctorName, styles?.doctorName]}>{item.doctorName}</Text>
          <Text style={[defaultStyles.sessionType, styles?.sessionType]}>{item.type}</Text>
          <View style={[
            defaultStyles.statusBadge,
            { backgroundColor: statusColors[item.status]?.backgroundColor },
            styles?.statusBadge
          ]}>
            <Text style={[
              defaultStyles.statusText,
              { color: statusColors[item.status]?.textColor },
              styles?.statusText
            ]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDateHeader = (date: Date) => {
    if (renderCustomHeader) {
      return renderCustomHeader(date);
    }

    return (
      <View style={[defaultStyles.dateHeader, styles?.dateHeader]}>
        <Text style={[defaultStyles.dateText, styles?.dateText]}>
          {format(date, dateFormat)}
        </Text>
      </View>
    );
  };

  const groupedSessions = sessions.reduce<Record<string, Session[]>>((acc, session) => {
    const dateString = format(session.date, 'yyyy-MM-dd');
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(session);
    return acc;
  }, {});

  const renderGroup = () => {
    return Object.entries(groupedSessions).map(([date, dateSessions]) => (
      <View key={date}>
        {renderDateHeader(new Date(date))}
        {dateSessions.map((session) => (
          <View key={session.id}>
            {renderSessionCard({ item: session })}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={[defaultStyles.container, styles?.container]} nestedScrollEnabled={true}>
      <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
      <FlatList
        data={[1]}
        scrollEnabled={false}
        renderItem={() => (
          <View style={[defaultStyles.sessionsContainer, styles?.sessionsContainer]}>
            {renderGroup()}
          </View>
        )}
        keyExtractor={() => 'sessions'}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
    padding: 16,
    borderRadius: 18,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Manrope-Bold',
    color: '#553C9A',
    marginBottom: 20,
  },
  sessionsContainer: {
    gap: 16,
  },
  dateHeader: {
    marginVertical: 12,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
    color: '#6B46C1',
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#6B46C1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timeContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#E9D8FD',
  },
  time: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#553C9A',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#805AD5',
  },
  sessionInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#44337A',
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
    color: '#6B46C1',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
  },
});

export default UpcomingSessions;