import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	ActivityIndicator,
	View
} from 'react-native';

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const Loader = ({ size }) => {
	return (
		<View style={styles.loader}>
			<ActivityIndicator size={size || 'small'} color={'#2196F3'} />
		</View>
	);
};

export default Loader;
