import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../shared/Colors';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import {
  GoogleSignIn,
  GoogleSignInButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Login() {
  const configureGoogleSignIn = () => {
    Google.SignIn.configure({
      webClientId: WEB_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
    });
  };

  WebBrowser.maybeCompleteAuthSession();
  const [accessToken, setAcessToken] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [error, SetError] = useState(null);

  useEffect(() => {
    configureGoogleSignIn()
  })
  const signIn = async ()=> {
    console.log('button pressed')
    try {
      await GoogleSignIn.hasPlayServices()
      const userInfo = await GoogleSignIn.signIn()
      setUserInfo(userInfo)
    }catch (error) {
      SetError(error)
    }
  }

  const logout = () => {
    setUserInfo(undefined)
    GoogleSignIn.revokeAcess()
    GoogleSignIn.signOut()
  }


  //log the userInfo to see user details
  console.log(JSON.stringify(userInfo));
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bem vindo(a) ao Dialog</Text>
        <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 20 }}>
          Entrar / Inscrever
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <AntDesign name='google' size={24} color='white' />
        <Text
          style={{ textAlign: 'center', marginLeft: 12, color: Colors.white }}
        >
          Entrar com o Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});