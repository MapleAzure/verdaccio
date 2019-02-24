/**
 * @prettier
 * @flow
 */

/* eslint-disable */

import React from 'react';
import type { Element } from 'react';
import { spacing } from '../../utils/styles/mixings';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar2 from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Tag from '../Tag';
import { formatDate, formatDateDistance } from '../../utils/package';

import { IProps } from './types';
import {
  WrapperLink,
  Header,
  MainInfo,
  Name,
  Version,
  Overview,
  Published,
  OverviewItem,
  Description,
  Icon,
  Text,
  Details,
  Avatar,
  Author,
  Field,
  Content,
  Footer,
  PackageName
} from './styles';
import { fontWeight } from '../../utils/styles/sizes';

const getInitialsName = (name: string) =>
  name
    .split(' ')
    .reduce((accumulator, currentValue) => accumulator.charAt(0) + currentValue.charAt(0), '')
    .toUpperCase();

const Package = ({ name: label, version, time, author: { name, avatar }, description, license, keywords = [] }: IProps): Element<WrapperLink> => {
  const renderMainInfo = () => (
    <MainInfo>
      <Name>{label}</Name>
      <Version>{`v${version}`}</Version>
    </MainInfo>
  );

  const renderAuthorInfo = () => {
    return (
      <Author>
        <Avatar alt={name} src={avatar} style={{ width: '20px', height: '20px' }}/>
        <Details>
          <Text text={name} />
        </Details>
      </Author>
    );
  }
  const renderLicenseInfo = () =>
    license && (
      <OverviewItem>
        <Icon modifiers={spacing('margin', '4px', '5px', '0px', '0px')} name={'license'} pointer={true} />
        {license}
      </OverviewItem>
    );

  const renderPublishedInfo = () => (
    <OverviewItem>
      <Icon name={'time'} pointer={true} />
      <Published modifiers={spacing('margin', '0px', '5px', '0px', '0px')}>{`Published on ${formatDate(time)} •`}</Published>
      {`${formatDateDistance(time)} ago`}
    </OverviewItem>
  );

  const renderDescription = () =>
    description && (
      <Field>
        <Description>{description}</Description>
      </Field>
    );

  // return (
  //   <WrapperLink className={'package'} to={`/-/web/detail/${label}`}>
  //     <Header>
  //       {renderMainInfo()}
  //       <Overview>
  //         {renderLicenseInfo()}
  //         {renderPublishedInfo()}
  //       </Overview>
  //     </Header>
  //     <Content>
  //       <Field>{renderAuthorInfo()}</Field>
  //       {renderDescription()}
  //     </Content>
  //     {keywords.length > 0 && (
  //       <Footer>
  //         {keywords.sort().map((keyword, index) => (
  //           <Tag key={index}>{keyword}</Tag>
  //         ))}
  //       </Footer>
  //     )}
  //   </WrapperLink>
  // );
  const tags =  keywords.sort().map((keyword, index) => (
    <Tag style={{ color: '#485A3E' }} key={index}>{keyword}</Tag>
  )); 

  return (
    <List style={{ padding: '20px 0 20px 0'}}>
      <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
          <Avatar2 alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
        <ListItemText component="div"
          primary={<PackageName>{label}</PackageName>}
          secondary={
            <React.Fragment>
              <Typography component="span" style={{ color: '#586069', fontSize: '14px', paddingRight: 0 }}>
                {description}
              </Typography>
              {tags.length > 0 && <span style={{ marginTop: '15px', display: 'block' }}>
                {tags}
              </span>}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        {renderAuthorInfo()}
      </ListItem>
    </List>
  );
};
export default Package;
