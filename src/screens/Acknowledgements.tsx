import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FloatBack, Separator } from '../components/Utils'
import { RootStackParamList } from '../routes/Navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type AcknowledgementsProps = NativeStackScreenProps<RootStackParamList, 'Acknowledgements'>;

const Acknowledgements = ({ navigation }: AcknowledgementsProps) => {
    return (
        <ScrollView style={styles.container}>
            <FloatBack onPress={() => navigation.goBack()} />

            <View>
                <View style={styles.heading}>
                    <Text style={styles.text}>The following libraries were used in the making of this app</Text>
                </View>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>React Navigation</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>

                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>React Native True Sheet</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>Axios</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>React Native Reaimated</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>React Native Snackbar</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>Formik</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>Yup</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
            </View>

            <View style={{ marginTop: 15 }}>
                <View style={styles.heading}>
                    <Text style={styles.text}>The following APIs were used in the making of this app</Text>
                </View>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>RAWG</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
            </View>

            <View style={{ marginTop: 15 }}>
                <View style={styles.heading}>
                    <Text style={styles.text}>Other Acknowledgements</Text>
                </View>
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.text}>Google Firebase</Text>
                        <Icon name="chevron-right" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </Card>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 10
    },
    heading: {
        margin: 10,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
})

export default Acknowledgements;