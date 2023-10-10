import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";
import { ipAddress } from "../dtos/request/api/Connection";
import { accessTokenState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export const fetchRepresentativeCard = async (accessToken) => {
    try {
      const response = await fetch(`http://${ipAddress}/api/accounts/representativeCard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data; // 서버에서 받은 데이터 반환
      } else {
        console.error("대표 카드 정보를 불러오는 중 오류 발생:", response.status);
        return null;
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      Alert.alert("오류 발생", "서버 요청 중 오류가 발생했습니다.");
      return null;
    }
  };