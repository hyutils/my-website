import React from 'react'
import MyEdtior from './Myedtior';
import { useTranslation } from 'react-i18next';
import List from '../components/VirtualTable/list';
import TableList from '../components/VirtualTable/table'
import ChangeLang from '../components/ChangeLanguage/intl'

import intl from 'react-intl-universal';
import './style.less';
 const AppIndex = ()=> {
  const { t } = useTranslation();
  return (
    <div className='pageRoot'>
      <div className='left-demo'>
       
        <MyEdtior />
      </div>
      <div className='right-bigData'>
        {/* <List /> */}
        {/* <TableList /> */}
        <ChangeLang />
        <div>{intl.get('user.username')}</div>
       {/* <div style={{paddingTop: 16}}> {t('home.hello')}</div> */}
      </div>
    </div>
  )
}
export default AppIndex;