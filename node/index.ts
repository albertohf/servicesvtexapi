import { Service, ServiceContext, ParamsContext, RecorderState, method, } from '@vtex/api'

import { Clients } from './clients'
import { oms } from './handlers/oms'


declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    // code: number
  }
}

export default new Service<Clients, State, ParamsContext>(
  { clients: { implementation: Clients, options: { default: { retries: 2, timeout: 10000, }, }, },
   routes: { hook: method({ POST: [oms], GET: oms }), }, })
