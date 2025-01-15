'use strict';

var React = require('react');
var reactNative = require('react-native');
var reactNativeChartKit = require('react-native-chart-kit');
var dateFns = require('date-fns');
var lucideReactNative = require('lucide-react-native');

const Button = ({ label, onPress }) => {
    return (React.createElement(reactNative.TouchableOpacity, { style: styles$7.button, onPress: onPress },
        React.createElement(reactNative.Text, { style: styles$7.text }, label)));
};
const styles$7 = reactNative.StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

const Card = ({ title, content }) => {
    return (React.createElement(reactNative.View, { style: styles$6.card },
        React.createElement(reactNative.Text, { style: styles$6.title }, title),
        React.createElement(reactNative.Text, { style: styles$6.content }, content)));
};
const styles$6 = reactNative.StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: '#555',
    },
});

const WeatherWidget = ({ location, temperature, description }) => (React.createElement(reactNative.View, { style: styles$5.widgetContainer },
    React.createElement(reactNative.View, { style: styles$5.iconContainer },
        React.createElement(reactNative.Text, null, "\u26C5")),
    React.createElement(reactNative.View, { style: styles$5.weatherContent },
        React.createElement(reactNative.Text, { style: styles$5.weatherTitle },
            "Weather Update: ",
            location),
        React.createElement(reactNative.Text, { style: styles$5.temperature },
            temperature,
            "\u00B0C"),
        React.createElement(reactNative.Text, { style: styles$5.description }, description))));
const styles$5 = reactNative.StyleSheet.create({
    widgetContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        width: '100%'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#cc99ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    weatherContent: {
        backgroundColor: '#4299e1',
        padding: 16,
        borderRadius: 8,
        flex: 1,
        width: '100%'
    },
    weatherTitle: {
        color: '#fff',
        fontSize: 16,
    },
    temperature: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
    },
});

function MedicineManager({ initialMedicines = [], initialVisibleItems = 3, onMedicineAdded, }) {
    const [medicines, setMedicines] = React.useState(initialMedicines);
    const [expanded, setExpanded] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newMedicine, setNewMedicine] = React.useState({
        name: '',
        dose: '',
    });
    const displayedMedicines = expanded
        ? medicines
        : medicines.slice(0, initialVisibleItems);
    const handleAddMedicine = () => {
        if (newMedicine.name && newMedicine.dose) {
            const medicineToAdd = {
                ...newMedicine,
                date: new Date(),
            };
            setMedicines([...medicines, medicineToAdd]);
            onMedicineAdded?.(medicineToAdd);
            setNewMedicine({ name: '', dose: '' });
            setModalVisible(false);
        }
    };
    const renderItem = ({ item }) => (React.createElement(reactNative.View, { style: styles$4.row },
        React.createElement(reactNative.Text, { style: styles$4.medicineText }, item.name),
        React.createElement(reactNative.View, { style: styles$4.verticalDivider }),
        React.createElement(reactNative.Text, { style: styles$4.doseText }, item.dose)));
    const renderHeader = () => (React.createElement(reactNative.View, { style: styles$4.headerContainer },
        React.createElement(reactNative.View, { style: styles$4.header },
            React.createElement(reactNative.Text, { style: styles$4.headerText }, "Medicine"),
            React.createElement(reactNative.View, { style: styles$4.headerVerticalDivider }),
            React.createElement(reactNative.Text, { style: styles$4.headerText }, "Dose"))));
    return (React.createElement(reactNative.View, { style: styles$4.full },
        React.createElement(reactNative.View, { style: styles$4.container },
            renderHeader(),
            React.createElement(reactNative.FlatList, { data: displayedMedicines, renderItem: renderItem, keyExtractor: (item, index) => `${item.name}-${index}`, scrollEnabled: false, ItemSeparatorComponent: () => React.createElement(reactNative.View, { style: styles$4.separator }) }),
            medicines.length > initialVisibleItems && (React.createElement(reactNative.Pressable, { onPress: () => setExpanded(!expanded), style: styles$4.seeMoreContainer },
                React.createElement(reactNative.Text, { style: styles$4.seeMoreText }, expanded ? 'See less' : 'See more')))),
        React.createElement(reactNative.Pressable, { onPress: () => setModalVisible(true), style: styles$4.addButton },
            React.createElement(reactNative.Text, { style: styles$4.addButtonText }, "Add Medication")),
        React.createElement(reactNative.Modal, { animationType: "slide", transparent: true, visible: modalVisible, onRequestClose: () => setModalVisible(false) },
            React.createElement(reactNative.View, { style: styles$4.modalContainer },
                React.createElement(reactNative.View, { style: styles$4.modalContent },
                    React.createElement(reactNative.Text, { style: styles$4.modalTitle }, "Add New Medication"),
                    React.createElement(reactNative.TextInput, { style: styles$4.input, placeholder: "Medication Name", value: newMedicine.name, onChangeText: (text) => setNewMedicine({ ...newMedicine, name: text }) }),
                    React.createElement(reactNative.TextInput, { style: styles$4.input, placeholder: "Dose (e.g., 100mg)", value: newMedicine.dose, onChangeText: (text) => setNewMedicine({ ...newMedicine, dose: text }) }),
                    React.createElement(reactNative.View, { style: styles$4.buttonContainer },
                        React.createElement(reactNative.Pressable, { style: [styles$4.button, styles$4.cancelButton], onPress: () => setModalVisible(false) },
                            React.createElement(reactNative.Text, { style: styles$4.cancelButtonText }, "Cancel")),
                        React.createElement(reactNative.Pressable, { style: [styles$4.button, styles$4.addButton], onPress: handleAddMedicine },
                            React.createElement(reactNative.Text, { style: styles$4.addButtonText }, "Add"))))))));
}
const styles$4 = reactNative.StyleSheet.create({
    full: {
        width: '100%'
    },
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        // width:'100%',
    },
    headerContainer: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        // fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Manrope-Bold',
    },
    headerVerticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e5e5e5',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e5e5e5',
        marginHorizontal: 8,
    },
    medicineText: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Manrope-Bold',
    },
    doseText: {
        flex: 1,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Manrope-Bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e5e5',
    },
    seeMoreContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    seeMoreText: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Manrope-Bold',
    },
    addButton: {
        backgroundColor: '#6366f1',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: '500',
    },
});

const severityLevels = {
    'Minimal': 1,
    'Mild': 2,
    'Moderate': 3,
    'Moderately Severe': 4,
    'Severe': 5,
};
const defaultData = [
    { date: '2023-12-22', severity: 'Severe' },
    { date: '2023-12-31', severity: 'Mild' },
];
const SeverityTracker = ({ data = [] }) => {
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
    return (React.createElement(reactNative.View, { style: styles$3.container },
        React.createElement(reactNative.View, { style: styles$3.header }),
        React.createElement(reactNativeChartKit.LineChart, { data: formatData(), width: reactNative.Dimensions.get('window').width - 32, height: 220, chartConfig: {
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
            }, bezier: true, style: styles$3.chart, yAxisLabel: "", yAxisSuffix: "", fromZero: true, segments: 5, formatYLabel: (value) => {
                const numberValue = Number(value);
                const levels = ['', 'Minimal', 'Mild', 'Moderate', 'Moderately Severe', 'Severe'];
                return numberValue >= 0 && numberValue < levels.length ? levels[numberValue] : '';
            } })));
};
const styles$3 = reactNative.StyleSheet.create({
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

const UpcomingSessions = ({ sessions = [], title = "Upcoming Sessions", styles, statusColors = {
    confirmed: {
        backgroundColor: '#9F7AEA',
        textColor: '#fff'
    },
    pending: {
        backgroundColor: '#E9D8FD',
        textColor: '#805AD5'
    }
}, onSessionPress, dateFormat = 'EEEE, MMMM d', timeFormat = 'h:mm a', renderCustomHeader, renderCustomSessionCard }) => {
    const renderSessionCard = ({ item }) => {
        if (renderCustomSessionCard) {
            return renderCustomSessionCard(item);
        }
        const timeString = dateFns.format(item.date, timeFormat);
        return (React.createElement(reactNative.TouchableOpacity, { style: [defaultStyles.sessionCard, styles?.sessionCard], onPress: () => onSessionPress?.(item) },
            React.createElement(reactNative.View, { style: [defaultStyles.timeContainer, styles?.timeContainer] },
                React.createElement(reactNative.Text, { style: [defaultStyles.time, styles?.time] }, timeString),
                React.createElement(reactNative.Text, { style: [defaultStyles.duration, styles?.duration] }, item.duration)),
            React.createElement(reactNative.View, { style: [defaultStyles.sessionInfo, styles?.sessionInfo] },
                React.createElement(reactNative.Text, { style: [defaultStyles.doctorName, styles?.doctorName] }, item.doctorName),
                React.createElement(reactNative.Text, { style: [defaultStyles.sessionType, styles?.sessionType] }, item.type),
                React.createElement(reactNative.View, { style: [
                        defaultStyles.statusBadge,
                        { backgroundColor: statusColors[item.status]?.backgroundColor },
                        styles?.statusBadge
                    ] },
                    React.createElement(reactNative.Text, { style: [
                            defaultStyles.statusText,
                            { color: statusColors[item.status]?.textColor },
                            styles?.statusText
                        ] }, item.status.charAt(0).toUpperCase() + item.status.slice(1))))));
    };
    const renderDateHeader = (date) => {
        if (renderCustomHeader) {
            return renderCustomHeader(date);
        }
        return (React.createElement(reactNative.View, { style: [defaultStyles.dateHeader, styles?.dateHeader] },
            React.createElement(reactNative.Text, { style: [defaultStyles.dateText, styles?.dateText] }, dateFns.format(date, dateFormat))));
    };
    const groupedSessions = sessions.reduce((acc, session) => {
        const dateString = dateFns.format(session.date, 'yyyy-MM-dd');
        if (!acc[dateString]) {
            acc[dateString] = [];
        }
        acc[dateString].push(session);
        return acc;
    }, {});
    const renderGroup = () => {
        return Object.entries(groupedSessions).map(([date, dateSessions]) => (React.createElement(reactNative.View, { key: date },
            renderDateHeader(new Date(date)),
            dateSessions.map((session) => (React.createElement(reactNative.View, { key: session.id }, renderSessionCard({ item: session })))))));
    };
    return (React.createElement(reactNative.ScrollView, { style: [defaultStyles.container, styles?.container], nestedScrollEnabled: true },
        React.createElement(reactNative.Text, { style: [defaultStyles.title, styles?.title] }, title),
        React.createElement(reactNative.FlatList, { data: [1], scrollEnabled: false, renderItem: () => (React.createElement(reactNative.View, { style: [defaultStyles.sessionsContainer, styles?.sessionsContainer] }, renderGroup())), keyExtractor: () => 'sessions', showsVerticalScrollIndicator: false })));
};
const defaultStyles = reactNative.StyleSheet.create({
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

const SkeletonLoading = () => {
    // Create refs for each line's animation
    const lineAnims = [
        React.useRef(new reactNative.Animated.Value(0)).current,
        React.useRef(new reactNative.Animated.Value(0)).current,
        React.useRef(new reactNative.Animated.Value(0)).current,
        React.useRef(new reactNative.Animated.Value(0)).current,
    ];
    React.useEffect(() => {
        // Create sequential animations for each line
        const createLineAnimation = (anim, delay) => reactNative.Animated.sequence([
            reactNative.Animated.timing(anim, {
                toValue: 1,
                duration: 800,
                delay,
                useNativeDriver: true,
            }),
            reactNative.Animated.timing(anim, {
                toValue: 0.4,
                duration: 600,
                useNativeDriver: true,
            }),
        ]);
        // Combine all line animations into a staggered sequence
        const loadingAnimation = reactNative.Animated.loop(reactNative.Animated.stagger(200, lineAnims.map((anim, index) => createLineAnimation(anim, index * 100))));
        loadingAnimation.start();
        return () => {
            lineAnims.forEach(anim => anim.stopAnimation());
        };
    }, []);
    // Generate style for each line with width and opacity animations
    const getLineStyle = (index) => ({
        opacity: lineAnims[index].interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.4, 1, 0.4],
        }),
        transform: [{
                scaleX: lineAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                }),
            }],
    });
    return (React.createElement(reactNative.View, { style: styles$2.container }, lineAnims.map((_, index) => (React.createElement(reactNative.Animated.View, { key: index, style: [
            styles$2.line,
            getLineStyle(index),
            // Vary line widths to make it look more natural
            { width: `${85 + (index % 2) * 10}%` },
        ] })))));
};
const styles$2 = reactNative.StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    line: {
        height: 12,
        backgroundColor: "#7639DE",
        borderRadius: 6,
        opacity: 0.4,
    },
});

const ErrorFallback = () => {
    return (React.createElement(reactNative.View, { style: styles$1.errorContainer },
        React.createElement(reactNative.View, { style: styles$1.errorIconContainer },
            React.createElement(lucideReactNative.AlertCircle, { size: 24, color: "#7639DE" })),
        React.createElement(reactNative.Text, { style: styles$1.errorTitle }, "Component Not Found"),
        React.createElement(reactNative.Text, { style: styles$1.errorMessage }, "I understand what you're asking for, but I don't have the right component for you. I'm working on expanding my capabilities!")));
};
const styles$1 = reactNative.StyleSheet.create({
    errorContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#E4D4FF',
        alignItems: 'center',
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    errorIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3EEFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    errorTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
        fontFamily: 'Manrope-Bold',
    },
    errorMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Manrope-SemiBold',
        lineHeight: 20,
    },
});

function DietPlanComponent({ mealPlans, }) {
    const groupedMeals = mealPlans.reduce((acc, item) => {
        if (!acc[item.mealTime]) {
            acc[item.mealTime] = [];
        }
        acc[item.mealTime].push(item);
        return acc;
    }, {});
    const renderFoodItem = (item) => (React.createElement(reactNative.TouchableOpacity, { key: item.id, style: styles.foodItem },
        React.createElement(reactNative.View, { style: styles.foodDetails },
            React.createElement(reactNative.Text, { style: styles.foodName }, item.name),
            item.imageUrl && (React.createElement(reactNative.Image, { source: { uri: item.imageUrl }, style: styles.foodImage, resizeMode: "cover" })),
            React.createElement(reactNative.View, { style: styles.badge },
                React.createElement(reactNative.Text, { style: styles.badgeText }, item.texture)),
            React.createElement(reactNative.View, { style: styles.sensoryInfo },
                React.createElement(reactNative.Text, { style: styles.sectionTitle }, "Sensory Considerations:"),
                item.sensoryConsiderations?.map((consideration, index) => (React.createElement(reactNative.Text, { key: index, style: styles.sensoryText },
                    "\u2022 ",
                    consideration)))),
            item.allergyWarnings && (React.createElement(reactNative.View, { style: styles.allergyWarnings },
                React.createElement(reactNative.Text, { style: styles.warningText },
                    "\u26A0\uFE0F Allergy Alert: ",
                    item.allergyWarnings.join(', ')))))));
    return (React.createElement(reactNative.ScrollView, { style: styles.container }, Object.entries(groupedMeals).map(([mealTime, foods]) => (React.createElement(reactNative.View, { key: mealTime, style: styles.mealSection },
        React.createElement(reactNative.Text, { style: styles.mealTimeTitle }, mealTime.charAt(0).toUpperCase() + mealTime.slice(1)),
        foods.map(renderFoodItem))))));
}
const styles = reactNative.StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FAF5FF',
        borderRadius: 16
    },
    mealSection: {
        marginBottom: 20,
    },
    mealTimeTitle: {
        fontSize: 20,
        marginBottom: 10,
        color: '#553C9A',
        fontFamily: 'Manrope-Bold',
    },
    foodItem: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginVertical: 10
    },
    badge: {
        backgroundColor: '#007bff', // Blue background
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15, // Rounded corners
        alignSelf: 'flex-start', // Wrap content width
    },
    badgeText: {
        color: '#fff', // White text
        fontSize: 14,
        fontWeight: '600', // Semi-bold text
    },
    foodDetails: {
        flex: 1,
    },
    foodName: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333333',
        fontFamily: 'Manrope-Bold'
    },
    textureLabel: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333333',
        fontFamily: 'Manrope-SemiBold'
    },
    sensoryInfo: {
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
        marginBottom: 2,
        color: '#333333',
    },
    sensoryText: {
        fontSize: 12,
        marginLeft: 8,
        color: '#333333',
        fontFamily: 'Manrope-Bold'
    },
    allergyWarnings: {
        marginTop: 4,
        padding: 4,
        backgroundColor: '#FFE0E0',
        borderRadius: 4,
    },
    warningText: {
        color: '#D32F2F',
        fontSize: 12,
        fontFamily: 'Manrope-Regular'
    },
});

exports.Button = Button;
exports.Card = Card;
exports.DietPlan = DietPlanComponent;
exports.Error = ErrorFallback;
exports.MedicineManager = MedicineManager;
exports.SkeletonLoading = SkeletonLoading;
exports.SymptomTracker = SeverityTracker;
exports.UpcomingSessions = UpcomingSessions;
exports.WeatherWidget = WeatherWidget;
//# sourceMappingURL=index.js.map
