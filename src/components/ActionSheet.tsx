import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Button, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface SheetHandle {
  present: () => Promise<void>;
  dismiss: () => Promise<void>;
}

interface SheetComponentProps {
  children: React.ReactNode;
  title: string;
  sizes?: string[];
}

const Sheet = forwardRef<SheetHandle, SheetComponentProps>(({ children, title, sizes }, ref) => {
  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    present: async () => {
      await sheet.current?.present();
    },
    dismiss: async () => {
      await sheet.current?.dismiss();
    },
  }));

  return (
    <TrueSheet ref={sheet} sizes={["auto", "medium"]} cornerRadius={7}
    backgroundColor="#111111"
    >
      <View style={styles.sheetContainer}>
        <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={() => sheet.current?.dismiss()}>
        <Icon name='close-circle-outline' size={28} color="#f32929" />
        </Pressable>
        </View>
        {children}
      </View>
    </TrueSheet>
  );
});

const styles = StyleSheet.create({
  sheetContainer: {
    marginTop: 15,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20
  },
  title: {
    flex: 1,
    color: '#e0e0e0',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Sheet;
