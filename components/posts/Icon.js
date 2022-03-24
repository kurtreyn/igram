import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { postFooterIcons } from '../../shared/postFooterIcons';

const Icon = ({ imgStyle, imageUrl }) => {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
};

export default Icon;
