import {ConnectedWalletInterface} from './connected-wallet.interface';

export interface AuthStore {
  connecting: boolean;
  connected: boolean;
  wallet?: ConnectedWalletInterface;
  error?: string;
}
