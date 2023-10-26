import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function MeditationTimer() {
    const initialTime = 10 * 60;
    const restTime = 2 * 60;
    const [seconds, setSeconds] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [backcolor, setBackColor] = useState("white");

    const toStart = () => {
        setSeconds(initialTime);
        setIsRunning(true);
    };

    const toPause = () => {
        setIsRunning(false);
    };

    const toStop = () => {
        setIsRunning(false);
        setSeconds(initialTime);
        setBackColor("green");
    };

    const updateColor = () => {
        if (seconds <= 0 && backcolor === 'orange') {
            setBackColor("green");
            setSeconds(initialTime);
            setIsRunning(false);
        } else if (seconds <= 0) {
            setBackColor("orange");
            setSeconds(restTime);
        }else if (seconds==initialTime){
            setBackColor("green")
        };
    };

    useEffect(() => {
        let timer;
        if (isRunning && seconds >= 0) {
            timer = setTimeout(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
                updateColor();
            }, 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isRunning, seconds]);
    return (
        <View style={{
            flex: 1,
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backcolor} }>

            <View>
                <Text style={styles.timer}>{seconds.toString().padStart(3, "0")}</Text>
            </View>
            <View >
                <Button title="Start" onPress={toStart} />
                <Button title="Pause" onPress={toPause} />
                <Button title="Stop" onPress={toStop} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    timer: {
        fontSize: 80,
        color: "black",
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        margin: 20,
        borderRadius: 5,
        width: 200,
        height: 60,
    },
    buttonText: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
    },
});
