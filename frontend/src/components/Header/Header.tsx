'use client';

import Link from 'next/link';
import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';

const bookingLinks = [
  { href: '/dining', label: 'Dining & Drinking', description: 'Reserve a table at our restaurant' },
  { href: '/spa', label: 'Pool Club & Spa', description: 'Book spa treatments and pool access' },
  { href: '/events', label: 'Conference & Events', description: 'Book spaces for events' },
];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" className={classes.logo}>
            LOGO
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/about" className={classes.link}>
              About
            </Link>
            <Link href="/gallery" className={classes.link}>
              Gallery
            </Link>

            <HoverCard width={300} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <UnstyledButton className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Bookings
                    </Box>
                    <IconChevronDown size={16} />
                  </Center>
                </UnstyledButton>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                {bookingLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={classes.subLink}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Text size="sm" fw={500}>
                      {item.label}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {item.description}
                    </Text>
                  </Link>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            <Button disabled>Login</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" zIndex={1000000}>
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Link href="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/about" className={classes.link} onClick={closeDrawer}>
            About
          </Link>
          <Link href="/gallery" className={classes.link} onClick={closeDrawer}>
            Gallery
          </Link>

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Bookings
              </Box>
              <IconChevronDown size={16} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {bookingLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classes.subLink}
                onClick={closeDrawer}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Text size="sm" fw={500}>
                  {item.label}
                </Text>
                <Text size="xs" c="dimmed">
                  {item.description}
                </Text>
              </Link>
            ))}
          </Collapse>

          <Divider my="md" />

          <Group justify="center" grow pb="xl" px="md">
            <Button>Login</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
