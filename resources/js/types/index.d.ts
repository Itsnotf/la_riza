import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    roles: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    roles?: string[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}


interface Kasus {
    id: number;
    nama_kasus: string;
    kronologi: string;
    tanggal: string;
}

interface Pelaku {
    id: number;
    name: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    pekerjaan: string;
    jenis_kelamin: 'L' | 'P';
    alamat: string;
    status: 'lajang' | 'menikah';
  }

  interface KasusPelaku {
    kasus_id: number;
    pelaku_id: number;
    created_at: string;
    updated_at: string;
    pelaku: {
      name: string;
      jenis_kelamin: 'L' | 'P';
    };
    kasus?: {
      nama_kasus: string;
    };
  }

  interface interogasi{
    id: number,
    kasus_id:number,
    pelaku_id:number,
    deskripsi:string,
    bukti:string,
    pelaku : {
        name:string,
    }
  }

  interface Pasal {
    id : number,
    bab : string,
    nomor_pasal : string | number
  }

  interface PasalTerlanggar {
    kasus_id : number,
    pasal_id : number,
    pelaku_id : number,
    pivot: {
        pelaku_id: number;
        pasal_id: number;
        kasus_id: number;
      };
    pasal : {
        bab : string,
        nomor_pasal : string | number
    }
  }

  interface Saksi {
    id: number;
    name: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    pekerjaan: string;
    jenis_kelamin: 'L' | 'P';
    alamat: string;
    status: 'lajang' | 'menikah';
  }

  interface Anggota {
    id:number,
    name : string,
    pangkat : string,
    jabatan : string,
    keterangan : string,
  }

  interface Kesaksian{
    id: number,
    kasus_id:number,
    saksi_id:number,
    deskripsi:string,
    ikatan:string,
    bukti:string,
    saksi : {
        name:string,
    }
  }
