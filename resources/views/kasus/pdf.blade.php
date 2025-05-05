<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Kasus: {{ $kasus->nama_kasus }}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h1 { font-size: 16px; text-align: center; margin-bottom: 20px; }
        h2 { font-size: 14px; margin-top: 15px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        .section { margin-bottom: 15px; }
    </style>
</head>
<body>
    <h1>LAPORAN KASUS <br>{{ $kasus->nama_kasus }}</h1>

    <div class="section">
        <h2>Informasi Dasar Kasus</h2>
        <table>
            <tr>
                <th>Nama Kasus</th>
                <td>{{ $kasus->nama_kasus }}</td>
            </tr>
            <tr>
                <th>Tanggal</th>
                <td>{{ $kasus->tanggal }}</td>
            </tr>
            <tr>
                <th>Kronologi</th>
                <td>{{ $kasus->kronologi }}</td>
            </tr>
        </table>
    </div>

    @if($kasus->pelakus->count() > 0)
    <div class="section">
        <h2>Daftar Pelaku</h2>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pelaku</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach($kasus->pelakus as $index => $pelaku)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $pelaku->name }}</td>
                    <td>{{ $pelaku->pivot->status }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    @if($kasus->saksis->count() > 0)
    <div class="section">
        <h2>Daftar Saksi</h2>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Saksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($kasus->saksis as $index => $saksi)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $saksi->name }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    @if($kasus->anggotas->count() > 0)
    <div class="section">
        <h2>Daftar Anggota Terlibat</h2>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Anggota</th>
                </tr>
            </thead>
            <tbody>
                @foreach($kasus->anggotas as $index => $anggota)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $anggota->name }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    @if($kasus->pasals->count() > 0)
    <div class="section">
        <h2>Pasal-pasal yang Dilanggar</h2>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Pasal</th>
                    <th>Keterangan</th>
                    <th>Pelaku Terkait</th>
                </tr>
            </thead>
            <tbody>
                @foreach($kasus->pasals as $index => $pasal)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $pasal->bab }}</td>
                    <td>{{ $pasal->nomor_pasal }}</td>
                    <td>
                        @if($pasal->pivot->pelaku_id)
                            {{ $kasus->pelakus->find($pasal->pivot->pelaku_id)->name ?? 'Tidak diketahui' }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    @if($kasus->intogerasi->count() > 0)
    <div class="section">
        <h2>Catatan Interogasi</h2>
        @foreach($kasus->intogerasi as $interogasi)
        <table style="margin-bottom: 15px;">
            <tr>
                <th width="20%">Pelaku</th>
                <td>{{ $interogasi->pelaku->name }}</td>
            </tr>
            <tr>
                <th width="20%">Tanggal Interogasi</th>
                <td>{{ $interogasi->created_at }}</td>
            </tr>
            <tr>
                <th>Hasil Interogasi</th>
                <td>{{ $interogasi->deskripsi }}</td>
            </tr>
        </table>
        @endforeach
    </div>
    @endif

    @if($kasus->kesaksian->count() > 0)
    <div class="section">
        <h2>Kesaksian</h2>
        @foreach($kasus->kesaksian as $kesaksian)
        <table style="margin-bottom: 15px;">
            <tr>
                <th width="20%">Saksi</th>
                <td>{{ $kesaksian->saksi->name }}</td>
            </tr>
            <tr>
                <th>Isi Kesaksian</th>
                <td>{{ $kesaksian->deskripsi }}</td>
            </tr>
            <tr>
                <th>Ikatan Dengan Pelaku</th>
                <td>{{ $kesaksian->ikatan }}</td>
            </tr>
            <tr>
                <th>Tanggal Kesaksian</th>
                <td>{{ $kesaksian->created_at }}</td>
            </tr>
        </table>
        @endforeach
    </div>
    @endif

    <div style="text-align: right; margin-top: 30px;">
        <p>Dibuat pada: {{ date('d F Y H:i:s') }}</p>
    </div>
</body>
</html>
