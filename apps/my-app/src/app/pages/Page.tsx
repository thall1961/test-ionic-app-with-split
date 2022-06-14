import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
// Use the import let = require syntax on TS.
import { SplitFactory } from '@splitsoftware/splitio';
import SplitIO from "@splitsoftware/splitio/types/splitio";
import {environment} from "../../environments/environment";

const Page: React.FC = () => {
  console.log('auth', environment.REACT_APP_SPLIT_TEST_AUTH, process.env['NODE_ENV']);
  // Instantiate the SDK
  const factory: SplitIO.ISDK = SplitFactory({
    core: {
      authorizationKey: environment.REACT_APP_SPLIT_TEST_AUTH || '',
      // the key can be the logged in
      // user id, or the account id that
      // the logged in user belongs to.
      // The type of customer (user, account, custom)
      // is chosen during Split's sign-up process.
      key: environment.REACT_APP_SPLIT_TEST_KEY || ''
    },
    startup: {
      readyTimeout: 1.5 // 1.5 sec
    }
  });

  const [treatment, setTreatment] = useState('off');
  const client: SplitIO.IClient | null = factory.client();
  // useEffect(() => {
  //   // And get the client instance you'll use
  //   let client: SplitIO.IClient | null = factory.client();
  //   const treatmentResponse = client?.getTreatment('test_split');
  //   if (treatmentResponse) {
  //     console.log('treatmentResponse', treatmentResponse)
  //     setTreatment(treatmentResponse);
  //   }
  //   return () => {
  //     client?.destroy().then(function() {
  //       client = null;
  //       // possible routing
  //       // document.location.replace('another_page');
  //     });
  //   }
  // }, [factory]);
  client.on(client.Event.SDK_READY, function() {
    const treatmentResponse: SplitIO.Treatment | undefined = client?.getTreatment("test_split");
    if (treatmentResponse) {
      setTreatment(treatmentResponse)
    }
  });

  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        {treatment === 'on' && <h1>This is a great feature!</h1>}
      </IonContent>
    </IonPage>
  );
};

export default Page;
