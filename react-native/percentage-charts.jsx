// 简单实现的环状百分比图（react native 里用echarts太难搞了，本组件用css实现）

import React, {useState} from 'react'
import {View} from 'react-native'
import {Text} from '@ui-kitten/components'
import {useTheme} from '@ui-kitten/components'
import MainStyle from 'components/MainStyle/MainStyle'
import {useEffect} from 'react'

export default function PercentageCharts(props) {
  let {percentage = 0, subTitle = '', size = 180, capWidth = 10} = props
  const theme = useTheme()

  const [deg, setDeg] = useState(0)

  useEffect(() => {
    if (!percentage) return setDeg(0.5)
    setDeg(percentage > 100 ? 360 : (percentage / 100) * 360)
  }, [percentage])

  const renderPercentage = () => {
    if (percentage < 10) {
      return percentage.toFixed(2) + '%'
    }
    if (percentage < 100) {
      return percentage.toFixed(1) + '%'
    }
    if (percentage >= 100) {
      return Math.trunc(percentage) + '%'
    }
    return '--%'
  }

  return (
    <>
      <View
        style={{
          position: 'relative',
          width: size,
          height: size,
          backgroundColor: theme['color-primary-500'],
          borderRadius: size / 2,
          overflow: 'hidden',
        }}>
        <View
          style={[
            MainStyle.rowCenterCenter,
            {
              position: 'absolute',
              width: size,
              height: size,
              zIndex: size / 2,
            },
          ]}
        />
        <View
          style={[
            MainStyle.columnCenterCenter,
            {
              position: 'absolute',
              width: size - capWidth * 2,
              height: size - capWidth * 2,
              borderRadius: size / 2 - capWidth,
              zIndex: 22,
              top: capWidth,
              left: capWidth,
              backgroundColor: theme['color-basic-200'],
            },
          ]}>
          <Text status="primary" style={{fontSize: 42, fontWeight: 'bold'}}>
            {renderPercentage()}
          </Text>
          <Text category="h4" style={{color: theme['color-primary-300'], fontWeight: 'bold'}}>
            {subTitle}
          </Text>
        </View>

        {deg < 180 ? (
          <>
            <View
              style={[
                MainStyle.rowCenterCenter,
                {
                  position: 'absolute',
                  width: size,
                  height: size,
                  zIndex: 10,
                },
              ]}>
              <View style={{width: size / 2, height: size, backgroundColor: theme['color-basic-300']}} />
              <View style={{width: size / 2, height: size, backgroundColor: 'transparent'}} />
            </View>
            <View
              style={[
                MainStyle.rowCenterCenter,
                {
                  position: 'absolute',
                  width: size,
                  height: size,
                  transform: [
                    {
                      rotate: deg + 'deg',
                    },
                  ],
                },
              ]}>
              <View style={{width: size / 2, height: size, backgroundColor: theme['color-primary-500']}} />
              <View style={{width: size / 2, height: size, backgroundColor: theme['color-basic-300']}} />
            </View>
          </>
        ) : (
          <>
            <View
              style={[
                MainStyle.rowCenterCenter,
                {
                  position: 'absolute',
                  width: size,
                  height: size,
                  zIndex: 10,
                },
              ]}>
              <View style={{width: size / 2, height: size, backgroundColor: 'transparent'}} />
              <View style={{width: size / 2, height: size, backgroundColor: theme['color-primary-500']}} />
            </View>

            <View
              style={[
                MainStyle.rowCenterCenter,
                {
                  position: 'absolute',
                  width: size,
                  height: size,
                  transform: [
                    {
                      rotate: deg - 180 + 'deg',
                    },
                  ],
                },
              ]}>
              <View style={{width: size / 2, height: size, backgroundColor: theme['color-basic-300']}} />
              <View style={{width: size / 2, height: size, backgroundColor: 'transparent'}} />
            </View>
          </>
        )}
      </View>
    </>
  )
}
