# bitcoinpages.io block explorer

A simple minimalist block explorer written in NodeJS and ReactJS.

### requirements

This app require  [a bitcoind full node](https://bitcoin.org/en/full-node)  with txindex set to 1
and [an ElectrumX node](https://electrumx.readthedocs.io/en/latest/).

Nodes should be availables on the same LAN. 
Please note that bootstraping blockchain nodes may take several days.

Please refer to respectives websites for install notes.

App configuration to connect to blockchain nodes is in server/config.js.

### install client

```bash
cd ./client &&  npm install && yarn build
```
### install server

```bash
cd ./server && npm install
```
### devel

```bash
cd ./server && npm run dev
```

```bash
cd ./client && yarn start
```

### run

When built and nodes up and configured:

```bash
sudo npm install pm2 -g
pm2 start app.js

```

### todos

- some paginations
- server have to be completed for switching beetwen currencies/chains
- tests! tests! tests!
- publish running server
