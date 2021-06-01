import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {checkPhone, register} from '../../redux/auth/auth.actions';
import Styles from '../../constants/Styles';
import Input from '../../components/Input';
import AuthSwithcer from '../../components/AuthSwithcer';
import {transformPhone} from '../../utils/helpers';
import {sendSms, checkValidity} from '../../api/authApi';

const Register = ({navigation: {navigate}}) => {
  const {screen, formContainer, infoCont, contentCont} = styles;
  const dispatch = useDispatch();
  const toLogin = () => navigate('login');
  const [phoneNumber, setPhone] = useState('');
  const regiserHanler = async ({username, phone, password}) => {
    console.log(username, password, phone);
    phone && (await dispatch(checkPhone(phone)));
    username && (await dispatch(checkUserName(username)));
    await dispatch(register(username, phone, password));
  };
  const phoneHandler = async () => {
    try {
      const phoneToSend = transformPhone(phoneNumber);
      console.log('pts', phoneToSend);
      const valididtyResoinse = await checkValidity('phone', phoneToSend);
      console.log('validity response', valididtyResoinse);
      if (!valididtyResoinse?.valid) {
        alert('Такий номер телефону уже існує!');
        return;
      }
      const {code} = await sendSms(phoneToSend);
      console.log('got code', code);
      navigate('verification', {
        phone: phoneNumber,
        code: code.toString(),
        phoneToSend,
      });
    } catch (error) {
      console.log('got Error', {error});
      alert('Server Error');
    }
  };
  return (
    <View style={screen}>
      <View style={infoCont}>
        <Text style={{...Styles.heading, marginBottom: 12}}>
          Номер телефону
        </Text>
        <Text style={Styles.secondaryText}>
          На цей номер буде надіслано код підтвердження
        </Text>
      </View>
      <Formik
        isInitialValid={false}
        initialValues={{
          username: '',
          phone: '',
          password: '',
        }}
        onSubmit={regiserHanler}>
        {() => (
          <View style={contentCont}>
            <View style={formContainer}>
              <Input
                mode="phone"
                inputValue={phoneNumber}
                setValue={setPhone}
              />
            </View>

            <View>
              <Button title="Далі" action={phoneHandler} />
              <AuthSwithcer goTo={toLogin} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: '3%',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  loginBtn: {
    width: '30%',
  },
  toRegisterBtn: {
    width: '30%',
  },
  btnCont: {
    flexDirection: 'row',
  },
  infoCont: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  contentCont: {
    height: '86%',
    justifyContent: 'space-between',
  },
});
