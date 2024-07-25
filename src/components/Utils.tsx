import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  TextInput,
  TextInputProps
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconSize } from '../utils/constants/enums/iconEnums';

import { useField } from 'formik';

//SEPARATOR
type SeparatorProps = {
  style?: StyleProp<ViewStyle>;
}
const Separator = ({ style }: SeparatorProps) => {
  return <View style={[styles.separator, style]}></View>;
};


//BADGE
type BadgeProps = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
};

const Badge = ({ children, style }: BadgeProps) => {
  return (
    <View>
      <Pressable style={[styles.badge, style]}>{children}</Pressable>
    </View>
  );
};


//LINK
type LinkProps = {
  children?: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  iconName: string;
  title: string;
  onPress: () => void;
};

const SettingsLink = ({ children, style, iconName, title, onPress }: LinkProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.link, style]}>
      <View style={styles.linkGroup}>
        <Icon name={iconName} size={IconSize.m} color="#000000" />
        <Text style={styles.linkText}>{title}</Text>
      </View>
      {/* <Icon name='chevron-right' size={IconSize.m} color="#000000" /> */}
      {children}
    </Pressable>
  );
};


//RADIO BUTTON
type RadioGroupProps = {
  options: Option[];
  selectedOption: string | number | null;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const RadioGroup = ({ options, selectedOption, style, onChange }: RadioGroupProps) => {
  const handleSelectOption = (value: string) => {
    onChange(value);
  }

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity key={option.value} onPress={() => handleSelectOption(option.value)} >
          <View style={styles.radioOptions}>
            {<Text style={styles.radioText}>{option.label}</Text>}
            <View style={styles.radioCircle}>
              {selectedOption === option.value && <View style={styles.selectedOption} />}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

//////////////TEXT INPUT
interface InputProps extends TextInputProps {
  label: string;
  name: string;
  iconName?: string;
};

const TxtInput: React.FC<InputProps> = ({ label, name, iconName, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <View style={styles.inputContainer}>
      <View style={{flexDirection: 'row'}}>
      {/* {iconName && <Icon name={iconName} size={20} color={'#000'} />} */}
      <Text style={styles.label}>{label}</Text>
      </View>

      <TextInput style={styles.input} onChangeText={field.onChange(name)} onBlur={field.onBlur(name)} value={field.value} {...props} cursorColor='#000000' />
      {meta.touched && meta.error && (
        <Text style={styles.inputError}>{meta.error}</Text>
      )}
    </View>
  )
};


////////////BUTTTON
type ButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled?: boolean;
};
const Button = ({ style, title, onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  //separator
  separator: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 10,
    borderRadius: 5,
  },

  //badge
  badge: {
    backgroundColor: '#000000',
    padding: 10,
    marginRight: 10,
    borderRadius: 3,
    elevation: 3,
  },

  // settings link
  link: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    // justifyContent: 'space-between'
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '900',
    marginLeft: 15,
  },
  linkGroup: {
    flex: 1,
    flexDirection: 'row',
  },

  //radio button
  radioOptions: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 22,
  },
  radioText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ffae00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffae00',
  },

  //text input
  inputContainer: {
    marginVertical: 8,

  },
  label: {
    color: '#303030',
    marginBottom: -10,
    marginLeft: 5
  },
  input: {
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: '#000000',
    marginBottom: 4,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: -2,
    backgroundColor: '111',
  },
  inputError: {
    color: 'red',
  },

  //button
  button: {
    padding: 10,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '900',
    letterSpacing: 1.5,
  }
});

export { Separator, Badge, SettingsLink, RadioGroup, TxtInput, Button };