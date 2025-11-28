import { ProposalAllContainer } from './containers/proposal-all.container';
import ProposalRequestContainer from './containers/proposal-request.container';
import { ProposalSignContainer } from './containers/proposal-sign.container';
import ProposalSuccessContainer from './containers/proposal-success.container';

export const routes = {
  ALL: ProposalAllContainer,
  REQUEST: ProposalRequestContainer,
  SUCCESS: ProposalSuccessContainer,
  SIGNATURE: ProposalSignContainer,
};
