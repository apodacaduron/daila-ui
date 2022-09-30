export const routes = {
  HOME: `/`,
  SIGN_IN: `/sign-in`,
  SIGN_UP: `/sign-up`,
  FORGOT_PASSWORD: '/forgot-password',
  TEAM_DASHBOARD: (teamId: string) => `/${teamId}/dashboard`,
}
