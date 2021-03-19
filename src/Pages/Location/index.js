import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {APILocation, APICode} from '../../api';
import Dropdown from '../../Components/Dropdown';

const Location = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [provinsiValue, setProvinsiValue] = useState('');
  const [kota, setKota] = useState([]);
  const [kotaValue, setKotaValue] = useState('');
  const [kecamatan, setKecamatan] = useState([]);
  const [kecamatanValue, setKecamatanValue] = useState('');
  const [kelurahan, setKelurahan] = useState([]);
  const [keluarahanValue, setKelurahanValue] = useState('');
  const [dataPostal, setPostal] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    _getProvinsi();
  }, []);

  const _getProvinsi = () => {
    APILocation()
      .request.get('provinsi')
      .then(res => {
        let arr = [];
        res.data.provinsi.map(i => {
          const data = {
            value: i.nama,
            label: i.nama,
            id: i.id,
          };
          arr.push(data);
        });
        setProvinsi(arr);
      });
  };

  const _getKota = id => {
    APILocation()
      .request.get(`kota?id_provinsi=${id}`)
      .then(res => {
        let arr = [];
        res.data.kota_kabupaten.map(i => {
          const data = {
            value: i.nama,
            label: i.nama,
            id: i.id,
          };
          arr.push(data);
        });
        setKota(arr);
      });
  };

  const _getKecamatan = id => {
    APILocation()
      .request.get(`kecamatan?id_kota=${id}`)
      .then(res => {
        let arr = [];
        res.data.kecamatan.map(i => {
          const data = {
            value: i.nama,
            label: i.nama,
            id: i.id,
          };
          arr.push(data);
        });
        setKecamatan(arr);
      });
  };

  const _getKelurahan = id => {
    APILocation()
      .request.get(`kelurahan?id_kecamatan=${id}`)
      .then(res => {
        let arr = [];
        res.data.kelurahan.map(i => {
          const data = {
            value: i.nama,
            label: i.nama,
            id: i.id,
          };
          arr.push(data);
        });
        setKelurahan(arr);
      });
  };

  // const _getPostal = () => {
  //   console.log(kotaValue, provinsiValue);

  //   APICode()
  //     .request.get(`city?id=${kotaValue.id}&province=${provinsiValue.id}`)
  //     .then(res => {
  //       const d = res.data.rajaongkir.results;
  //       console.log('s', res.data.rajaongkir);
  //       setPostal(d);
  //     })
  //     .catch(err => console.log('error get data kode pos', err));
  // };

  const _reset = () => {
    setProvinsiValue('');
    setKota([]);
    setKotaValue('');
    setKecamatan([]);
    setKecamatanValue('');
    setKelurahan([]);
    setKelurahanValue('');
    setSubmit(false);
  };

  const _submit = () => {
    if (provinsiValue && kotaValue && kecamatanValue && keluarahanValue) {
      setSubmit(true);
    } else {
      ToastAndroid.showWithGravity(
        'Data Belum Lengkap.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'rgba(255,136,1,0.5)',
          marginHorizontal: 10,
          alignItems: 'center',
          paddingVertical: 15,
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text style={{color: 'rgba(0,0,0,0.6)'}}>
          Sorry .. I can't find a suitable API to retrieve postal code data
        </Text>
      </View>
      <View style={{marginTop: 16}}>
        <Dropdown
          title={'Pilih Provinsi'}
          value={provinsiValue}
          item={provinsi}
          onChange={val => {
            setProvinsiValue(val);
            _getKota(val.id);
            setKotaValue('');
            setKecamatan([]);
            setKecamatanValue('');
            setKelurahan([]);
            setKelurahanValue('');
            setSubmit(false);
          }}
        />
      </View>
      <View style={{marginTop: 16}}>
        <Dropdown
          title={'Pilih Kota'}
          value={kotaValue}
          item={kota}
          onChange={val => {
            setKotaValue(val);
            _getKecamatan(val.id);
            setKecamatanValue('');
            setKelurahan([]);
            setKelurahanValue('');
            setSubmit(false);
          }}
        />
      </View>
      <View style={{marginTop: 16}}>
        <Dropdown
          title={'Pilih Kecamatan'}
          value={kecamatanValue}
          item={kecamatan}
          onChange={val => {
            setKecamatanValue(val);
            _getKelurahan(val.id);
            setKelurahanValue('');
            setSubmit(false);
          }}
        />
      </View>
      <View style={{marginTop: 16}}>
        <Dropdown
          title={'Pilih Kelurahan'}
          value={keluarahanValue}
          item={kelurahan}
          onChange={val => {
            setKelurahanValue(val);
            setSubmit(false);
          }}
        />
      </View>
      {isSubmit ? (
        <View style={{margin: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {keluarahanValue.label}, {kecamatanValue.label}, {kotaValue.label},{' '}
            {provinsiValue.label}
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={_submit}
        style={{
          backgroundColor: '#007e33',
          marginHorizontal: 10,
          paddingVertical: 20,
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 16,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_reset}
        style={{
          backgroundColor: '#cc0000',
          marginHorizontal: 10,
          paddingVertical: 20,
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Location;
