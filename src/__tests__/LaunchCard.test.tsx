// React
import React from 'react';
// Testing-library
import { render, screen } from '@testing-library/react';
// Components
import LaunchCard from "../components/LaunchCard/LaunchCard";
// Types
import {ILaunch} from "../models/ILaunch";
import {IRocket} from "../models/IRocket";

const mockLaunch = {
  name: 'Test Launch',
  details: 'Test details',
  date_utc: '2023-07-31T12:00:00.000Z',
};

const mockRocket = {
  flickr_images: ['http://example.com/rocket.jpg'],
};

test('renders LaunchCard with launch and rocket data', () => {
  render(<LaunchCard launch={mockLaunch as ILaunch} rocket={mockRocket as IRocket} />);

  // Check if launch name and details are rendered
  const nameElement = screen.getByText(/Test Launch/i);
  const detailsElement = screen.getByText(/Test details/i);
  expect(nameElement).toBeInTheDocument();
  expect(detailsElement).toBeInTheDocument();

  // Check if launch date is rendered in the correct format
  const dateElement = screen.getByText(/31\.07\.2023/i);
  expect(dateElement).toBeInTheDocument();

  // Check if rocket image is rendered with the correct src
  const rocketImage = screen.getByAltText('rocket') as HTMLImageElement;
  expect(rocketImage.src).toBe('http://example.com/rocket.jpg');
});

test('renders LaunchCard without rocket data', () => {
  render(<LaunchCard launch={mockLaunch as ILaunch} />);

  // Check if launch name and details are rendered
  const nameElement = screen.getByText(/Test Launch/i);
  const detailsElement = screen.getByText(/Test details/i);
  expect(nameElement).toBeInTheDocument();
  expect(detailsElement).toBeInTheDocument();

  // Check if launch date is rendered in the correct format
  const dateElement = screen.getByText(/31\.07\.2023/i);
  expect(dateElement).toBeInTheDocument();

  // Check if rocket image is not rendered when no rocket data is provided
  const rocketImage = screen.queryByAltText('rocket');
  expect(rocketImage).toBeNull();
});
