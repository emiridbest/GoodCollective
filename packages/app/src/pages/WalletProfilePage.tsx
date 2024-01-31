import React from 'react';
import Layout from '../components/Layout/Layout';
import { useDonorById, useStewardById } from '../hooks';
import { useLocation } from 'react-router-native';
import WalletProfile from '../components/WalletProfile';
import { useEnsName } from 'wagmi';
import { useFetchFullName } from '../hooks/useFetchFullName';

function WalletProfilePage() {
  const location = useLocation();
  const profileAddress = location.pathname.slice('/profile/'.length).toLocaleLowerCase();
  const donor = useDonorById(profileAddress, 1000);
  const steward = useStewardById(profileAddress);

  const address: `0x${string}` | undefined = profileAddress.startsWith('0x')
    ? (profileAddress as `0x${string}`)
    : undefined;

  const { data: ensName } = useEnsName({ address, chainId: 1 });

  const fullName = useFetchFullName(address);
  const [firstName, lastName] = fullName?.trim().split(' ') ?? [undefined, undefined];

  const userIdentifier = firstName ? `${firstName} ${lastName}` : ensName ?? address ?? '0x';

  return (
    <Layout breadcrumbPath={[{ text: userIdentifier, route: `/profile/${address}` }]}>
      <WalletProfile
        address={address}
        ensName={ensName ?? undefined}
        firstName={firstName}
        lastName={lastName}
        donor={donor}
        steward={steward}
      />
    </Layout>
  );
}

export default WalletProfilePage;