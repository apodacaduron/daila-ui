export const routes = {
  HOME: `/`,
  SIGN_IN: `/sign-in`,
  SIGN_UP: `/sign-up`,
  FORGOT_PASSWORD: '/forgot-password',
  TEAM_DASHBOARD: (teamId: string) => `/${teamId}/dashboard`,
  TEAM_APPOINTMENTS: (teamId: string) => `/${teamId}/appointments`,
  TEAM_PATIENTS: (teamId: string) => `/${teamId}/patients`,
  TEAM: (teamId: string) => `/${teamId}/team`,
  ADMIN: {
    TEAM_DASHBOARD: (teamId: string) => `/${teamId}/admin/dashboard`,
    TEAM_USERS: (teamId: string) => `/${teamId}/admin/users`
  }
}
