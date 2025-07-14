const { ConectarDB }= require('../server')
const db = require('../config/db').default

jest.mock('../config/db', () => ({
  __esModule: true,
  default: {
    authenticate: jest.fn(),
    sync: jest.fn()
  }
}))

describe('conectarDB', () => {
  it('Debe manejar el error en la conexion a la BD', async () => {
    db.authenticate.mockRejectedValueOnce(new Error('Hubo un error en la conexion a la DB'))

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await ConectarDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hubo un error en la conexion a la DB')
    )
  })
})