// Core
import React, { PureComponent } from 'react';
import store from 'store';

// Svg
// import svg from './svg/alarm.svg';

// Styles
import { Container, Notification, TextSpan, StyledLink, Cross } from './styles';

const NOTIFICATION_ID = 4;

export default class Notifications extends PureComponent {
  state = {
    closedNotificationId: store.get('closedNotificationId') || 0,
  };

  hideNotification = () => {
    this.setState({ closedNotificationId: NOTIFICATION_ID });
    store.set('closedNotificationId', NOTIFICATION_ID);
  };

  render() {
    const { closedNotificationId } = this.state;
    return (
      NOTIFICATION_ID > closedNotificationId && (
        <Container>
          <Notification>
            {/* <ImgSvg src={svg} alt="nice" />{' '} */}
            <TextSpan>
              {/* <TextSpanBold>Note:</TextSpanBold>{' '} */}
              New version:{' '}
              <StyledLink href="https://github.com/rise-worlds/Potato-Network-Monitor" target="__blank">
                v2.0-d
                {process.env.VERSION_NUMBER}
              </StyledLink>
            </TextSpan>
          </Notification>
          <Cross onClick={this.hideNotification} />
        </Container>
      )
    );
  }
}
