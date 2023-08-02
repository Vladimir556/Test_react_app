// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import {launchAPI} from "../services/LaunchService";
import {rocketAPI} from "../services/RocketService";
import App from "../App";

jest.mock('../services/LaunchService');
jest.mock('../services/RocketService');

const mockLaunches = {
  docs: [
    { id: '1', rocket: 'rocketId1', name: 'Launch 1' },
    { id: '2', rocket: 'rocketId2', name: 'Launch 2' },
  ],
  totalPages: 2,
};

const mockRockets = {
  rocketId1: { id: 'rocketId1', name: 'Rocket 1', flickr_images: ['http://example.com/rocket1.jpg'] },
  rocketId2: { id: 'rocketId2', name: 'Rocket 2', flickr_images: ['http://example.com/rocket2.jpg'] },
};

test('renders App with launches and rockets data', async () => {
  // Мокаем данные, возвращаемые API
  // @ts-ignore
  launchAPI.useFetchLaunchesQuery.mockReturnValue({ data: mockLaunches, isFetching: false });
  // @ts-ignore
  rocketAPI.useFetchRocketsQuery.mockReturnValue({ data: mockRockets });

  render(<App />);

  // Проверяем, что данные успешно загрузились и отображаются на странице
  expect(await screen.findByText(/Launch 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Launch 2/i)).toBeInTheDocument();
});
