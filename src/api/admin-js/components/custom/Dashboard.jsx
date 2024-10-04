import React from 'react'
import { Box, Button, H2, H5, Illustration, Text } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'
import { useTranslation } from 'adminjs'

const pageHeaderHeight = 300
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

export const DashboardHeader = () => {
  const { translateMessage } = useTranslation()
  return (
    <Box data-css="default-dashboard">
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="grey100">
          <H2 fontWeight="bold">{translateMessage('welcomeOnBoard_title')}</H2>
          <Text opacity={0.8}>
            {translateMessage('welcomeOnBoard_subtitle')}
          </Text>
        </Text>
      </Box>
    </Box>
  )
}

const boxes = ({ translateMessage }) => [
  {
    variant: 'Details',
    title: translateMessage('addingResources_title'),
    subtitle: translateMessage('addingResources_subtitle'),
    href: 'https://docs.adminjs.co/basics/resource#providing-resources-explicitly',
  },
  {
    variant: 'Docs',
    title: translateMessage('customizeResources_title'),
    subtitle: translateMessage('customizeResources_subtitle'),
    href: 'https://docs.adminjs.co/basics/resource#customizing-resources',
  },
  {
    variant: 'Plug',
    title: translateMessage('customizeActions_title'),
    subtitle: translateMessage('customizeActions_subtitle'),
    href: 'https://docs.adminjs.co/basics/action',
  },
]

const Card = styled(Box)`
  display: ${data => {
    console.log('data', data)
    return data.flex ? 'flex' : 'block'
  }};
  color: ${({ theme }) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`

Card.defaultProps = {
  variant: 'container',
  boxShadow: 'card',
}

export const Dashboard = () => {
  const { translateMessage, translateButton } = useTranslation()

  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes({ translateMessage }).map((box, index) => (
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card as="a" href={box.href} target="_blank">
              <Text textAlign="center">
                <Illustration variant={box.variant} width={100} height={70} />
                <H5 mt="md">{box.title}</H5>
                <Text>{box.subtitle}</Text>
              </Text>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Dashboard
