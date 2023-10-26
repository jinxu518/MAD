import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, ScrollView, View, Image, KeyboardAvoidingView, Platform, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STATUS = {
  StartMeditation: "Start Meditation",
  Pause: "Pause",
  Resume: "Resume",
}

export default function App() {
  const [state, setState] = useState({ running: STATUS.StartMeditation })
  const [time, setTime] = useState({ minute: 0, second: 0 })
  const [intervalId, setIntervalId] = useState(null); //
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [timerColor, setTimerColor] = useState('black');

  const startMeditation = async () => {
    let totalMeditation = Math.floor((parseInt(meditationDuration.medidate) + parseInt(meditationDuration.rest)) / 60);
    if (meditationDuration.medidate < 60 || meditationDuration.rest < 60) {
      Alert.alert('please input greater than 60 seconds ');
      return;
    }
    if (state.running === STATUS.StartMeditation) {
      if (intervalId !== null) {
        clearInterval(intervalId); // Clear the previous interval
      }

      setTime({ ...time, minute: totalMeditation })
      let currentDate = new Date();
      const medhis = {
        year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate(),
        hour: currentDate.getHours(), minute: currentDate.getMinutes()
      }
      updateAsyncStorageData(medhis);
      setBackgroundColor('green');
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.second <= 0) {
            return { minute: prevTime.minute - 1, second: 59 };
          } else {
            return { minute: prevTime.minute, second: prevTime.second - 1 };
          }
        });
      }, 1000);
      setIntervalId(id); // Store the interval ID
      setState({ ...state, running: STATUS.Pause });
      setTimerColor("white")

    }
    else if (state.running === STATUS.Pause) {
      if (intervalId !== null) {
        clearInterval(intervalId); // Clear the interval
      }
      setState({ ...state, running: STATUS.Resume });
    }
    else if (state.running === STATUS.Resume) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.second <= 0) {
            return { minute: prevTime.minute - 1, second: 59 };
          } else {
            return { minute: prevTime.minute, second: prevTime.second - 1 };
          }
        });
      }, 1000);
      setIntervalId(id); // Store the interval ID
      setState({ ...state, running: STATUS.Pause });
    }
  }

  const StopMeditation = async () => {
    if (intervalId !== null) {
      console.log('med histpr');
      clearInterval(intervalId); // Clear the interval
      setTime({ minute: 12, second: 0 })
      setBackgroundColor('white');
      setState({ ...state, running: STATUS.StartMeditation });
      setTimerColor("black")
      setMeditationDuration({ medidate: 0, rest: 0 });
    }
  }

  useEffect(() => {
    if (state.running !== STATUS.StartMeditation) {
      if (time.minute < 0) {
        if (intervalId !== null) {
          clearInterval(intervalId); // Clear the interval
          setTime({ minute: 12, second: 0 })
          setBackgroundColor('white');
          setState({ ...state, running: STATUS.StartMeditation });
          setTimerColor("white")
        }
      }
      else if (time.minute < 3) {
        setBackgroundColor('orange')
      }
      else {
        setBackgroundColor('green');
      }
    }
  }, [time.minute])
  const [meditationDuration, setMeditationDuration] = useState({});
  const inputChange = (text, inputField) => {
    setMeditationDuration({ ...meditationDuration, [inputField]: text });
  };
  const updateAsyncStorageData = async (newData) => {
    try {
      let existingData = await AsyncStorage.getItem('my-key-here');
      console.log("existingData", existingData)
      existingData = existingData ? JSON.parse(existingData) : [];
      existingData.push(newData);
      await AsyncStorage.setItem('my-key-here', JSON.stringify(existingData));
      console.log('Updated Data:', existingData);
    } catch (error) {
      console.error('AsyncStorage Error:', error);
    }
  };
  const [showHistory, SetShowHistory] = useState(false);
  const [MeditationList, setMeditationList] = useState([]);
  let existingHistory = []
  const ShowHistoryFun = async () => {
    SetShowHistory(!showHistory);
    existingHistory = await AsyncStorage.getItem('my-key-here');
    // Parse the existing data as JSON
    existingHistory = existingHistory ? JSON.parse(existingHistory) : [];
    setMeditationList(existingHistory);
    console.log("existingData", existingHistory)
  }
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View>
        <Image style={styles.tinyLogo} source={require('./assets/icon.png')} />
      </View>

      {state.running == STATUS.StartMeditation ?
        <View style={styles.inputcontainer} >
          <TextInput style={styles.textInput} onChangeText={(text) => inputChange(text, "medidate")} placeholder='Meditation time'></TextInput>
          <TextInput style={styles.textInput} onChangeText={(text) => inputChange(text, 'rest')} placeholder='Rest Time'></TextInput>
        </View>
        :
        <View >
          <Text style={[styles.clockSize, { color: timerColor }]}>
            {time.minute} : {time.second < 10 ? "0" + time.second : time.second}
          </Text>
        </View>
      }
      <TouchableHighlight onPress={startMeditation}>
        <Text style={{ fontSize: 30, color: timerColor }}>{state.running}</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={StopMeditation}>
        <Text style={{ fontSize: 30, color: "red" }}>Stop</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={ShowHistoryFun}>
        <Text style={{ fontSize: 30, color: "blue" }}>{showHistory ? "Hide History" : "Show History"}</Text>
      </TouchableHighlight>
      {showHistory && (
        <View style={styles.containerflat}>
          <FlatList
            data={MeditationList}
            renderItem={({ item }) => (
              <View style={styles.containerHistoryflat}>
                <Text style={styles.textBoxflat}>Year: {item.year}</Text>
                <Text style={styles.textBoxflat}> Day: {item.day}</Text>
                <Text style={styles.textBoxflat}> Hour: {item.hour}</Text>
                <Text style={styles.textBoxflat}> Minute: {item.minute}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()} // Ensure the key is unique
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'

  },
  containerHistory: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  TextBox: {
    marginStart: 10
  },

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  tinyLogo: {
    width: 200,
    height: 200,
  },
  inputcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'

  },
  clockSize: {
    fontSize: 100,

  },
  containerflat: {
    //flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  containerHistoryflat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textBoxflat: {
    fontSize: 16,
    color: '#333333',
  },
});
