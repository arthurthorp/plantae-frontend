import { Activity } from '@/model/Activity'
import { History } from '@/model/History'
import { formatDate } from '@/utils/formatDate'
import axios from 'axios'
import { parseCookies } from 'nookies'

export class ActivityService {
  private options: object

  constructor() {
    const { 'plantae.token': token } = parseCookies()

    this.options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  }

  async createHistory(activityId: number, data: History): Promise<boolean> {
    const res = await axios.post(
      `http://0.0.0.0/api/activities/${activityId}/histories`,
      data,
      {
        headers: {
          ...(this.options as any).headers,
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    )

    console.log(data, res)

    return res.statusText === 'Created'
  }

  async finishActivity(activityId: number) {
    const res = await axios.patch(
      `http://0.0.0.0/api/activities/${activityId}/finish`,
      null,
      this.options,
    )

    return res.statusText === 'OK'
  }

  async updateActivity(data: Activity): Promise<boolean> {
    const body = {
      ...data,
      chargeIn: data.user.id,
      plantationId: data.plantation.id,
      estimateDate: formatDate({
        date: data.estimateDate,
        format: 'YYYY-MM-DD',
      }),
      executionDate: data.executionDate
        ? formatDate({
            date: data.executionDate,
            format: 'YYYY-MM-DD',
          })
        : undefined,
    }

    const response = await axios.post(
      `http://0.0.0.0/api/activities/${data.id}`,
      body,
      {
        headers: {
          ...(this.options as any).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.statusText === 'OK'
  }

  async createActivity(data: Activity): Promise<boolean> {
    const body = {
      ...data,
      chargeIn: data.user.id,
      plantationId: data.plantation.id,
      estimateDate: formatDate({
        date: data.estimateDate,
        format: 'YYYY-MM-DD',
      }),
      executionDate: data.executionDate
        ? formatDate({
            date: data.executionDate,
            format: 'YYYY-MM-DD',
          })
        : undefined,
    }

    const response = await axios.post(`http://0.0.0.0/api/activities/`, body, {
      headers: {
        ...(this.options as any).headers,
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.statusText === 'Created'
  }
}
