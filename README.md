# Aplikasi Perpustakaan Sederhana

Aplikasi Perpustakaan Sederhana ini adalah sebuah sistem manajemen perpustakaan yang memungkinkan pengguna untuk mengelola buku, anggota, petugas, transaksi peminjaman buku dan transaksi
pengembalian buku.

## Fitur

- **Manajemen Buku**: Menambah, mengedit, menghapus, melihat daftar buku dan melihat detail buku.
- **Manajemen Anggota**: Menambah, mengedit, menghapus, dan melihat daftar anggota perpustakaan.
- **Transaksi Peminjaman**: Mencatat peminjaman, edit data peminjaman, menghitung denda (bila ada) hapus data peminjaman dan melihat detail peminjaman.
- **Transaksi Pengembalian**: Mencatat data pengembalian buku, menghapus data pengembalian buku

## Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Tailwind css
- **Database**: MySQL

## Persyaratan Sistem

- Node.js
- NPM (Node Package Manager) atau Yarn
- MySQL

## Instalasi

### Backend

1. Clone repository ini:

    ```sh
    git clone https://github.com/adhlira/BE_PerpusOnline
    cd nama-repo/backend
    ```

2. Instal dependensi:

    ```sh
    npm install
    ```

3. Buat file `.env` dan tambahkan konfigurasi berikut:

    ```env
    PORT=5000
    MySQL_URI=mysql://ara:1234@localhost:3306/perpus
    ```

4. Jalankan server:

    ```sh
    npm start
    ```


## API Endpoint

### Buku

- `GET /api/buku`: Mendapatkan daftar buku
- `GET /api/buku/id`: Mendapatkan daftar buku berdasarkan id
- `POST /api/buku`: Menambah buku baru
- `PUT /api/buku/:id`: Mengedit buku
- `DELETE /api/buku/:id`: Menghapus buku

### Anggota

- `GET /api/anggota`: Mendapatkan daftar anggota
- `POST /api/anggota`: Menambah anggota baru
- `PUT /api/anggota/:id`: Mengedit anggota
- `DELETE /api/anggota/:id`: Menghapus anggota

### Petugas

- `GET /api/petugas`: Mendapatkan daftar petugas
- `POST /api/petugas`: Mencatat data petugas baru
- `PUT /api/petugas/:id`: Mengedit data petugas
- `DELETE /api/petugas/:id`: Menghapus data petugas

### Peminjaman

- `GET /api/peminjaman`: Mendapatkan daftar peminjaman buku
- `GET /api/peminjaman/id`: Mendapatkan data peminjaman buku berdasarkan id
- `POST /api/peminjaman`: Mencatat peminjaman buku baru
- `PUT /api/peminjaman/:id`: Mengedit data peminjaman buku
- `DELETE /api/peminjaman/:id`: Menghapus data peminjaman buku

### Pengembalian

- `GET /api/pengembalian`: Mendapatkan daftar pengembalian
- `GET /api/pengembalian/id` : Mendapatkan daftar pengembalian berdasarkan id
- `POST /api/pengembalian`: Mencatat transaksi pengembalian buku baru
- `DELETE /api/petugas/:id`: Menghapus transaksi pengembalian buku

## Kontribusi

1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan (`git checkout -b fitur-baru`).
3. Commit perubahan Anda (`git commit -am 'Tambah fitur baru'`).
4. Push ke branch tersebut (`git push origin fitur-baru`).
5. Buat Pull Request.
