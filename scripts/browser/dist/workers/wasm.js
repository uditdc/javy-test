(() => {
  // node_modules/@bjorn3/browser_wasi_shim/dist/wasi_defs.js
  var CLOCKID_REALTIME = 0;
  var CLOCKID_MONOTONIC = 1;
  var ERRNO_SUCCESS = 0;
  var ERRNO_BADF = 8;
  var ERRNO_INVAL = 28;
  var ERRNO_NOSYS = 52;
  var ERRNO_NOTSUP = 58;
  var ERRNO_PERM = 63;
  var RIGHTS_FD_DATASYNC = 1 << 0;
  var RIGHTS_FD_READ = 1 << 1;
  var RIGHTS_FD_SEEK = 1 << 2;
  var RIGHTS_FD_FDSTAT_SET_FLAGS = 1 << 3;
  var RIGHTS_FD_SYNC = 1 << 4;
  var RIGHTS_FD_TELL = 1 << 5;
  var RIGHTS_FD_WRITE = 1 << 6;
  var RIGHTS_FD_ADVISE = 1 << 7;
  var RIGHTS_FD_ALLOCATE = 1 << 8;
  var RIGHTS_PATH_CREATE_DIRECTORY = 1 << 9;
  var RIGHTS_PATH_CREATE_FILE = 1 << 10;
  var RIGHTS_PATH_LINK_SOURCE = 1 << 11;
  var RIGHTS_PATH_LINK_TARGET = 1 << 12;
  var RIGHTS_PATH_OPEN = 1 << 13;
  var RIGHTS_FD_READDIR = 1 << 14;
  var RIGHTS_PATH_READLINK = 1 << 15;
  var RIGHTS_PATH_RENAME_SOURCE = 1 << 16;
  var RIGHTS_PATH_RENAME_TARGET = 1 << 17;
  var RIGHTS_PATH_FILESTAT_GET = 1 << 18;
  var RIGHTS_PATH_FILESTAT_SET_SIZE = 1 << 19;
  var RIGHTS_PATH_FILESTAT_SET_TIMES = 1 << 20;
  var RIGHTS_FD_FILESTAT_GET = 1 << 21;
  var RIGHTS_FD_FILESTAT_SET_SIZE = 1 << 22;
  var RIGHTS_FD_FILESTAT_SET_TIMES = 1 << 23;
  var RIGHTS_PATH_SYMLINK = 1 << 24;
  var RIGHTS_PATH_REMOVE_DIRECTORY = 1 << 25;
  var RIGHTS_PATH_UNLINK_FILE = 1 << 26;
  var RIGHTS_POLL_FD_READWRITE = 1 << 27;
  var RIGHTS_SOCK_SHUTDOWN = 1 << 28;
  var Iovec = class _Iovec {
    static read_bytes(view, ptr) {
      const iovec = new _Iovec();
      iovec.buf = view.getUint32(ptr, true);
      iovec.buf_len = view.getUint32(ptr + 4, true);
      return iovec;
    }
    static read_bytes_array(view, ptr, len) {
      const iovecs = [];
      for (let i = 0; i < len; i++) {
        iovecs.push(_Iovec.read_bytes(view, ptr + 8 * i));
      }
      return iovecs;
    }
  };
  var Ciovec = class _Ciovec {
    static read_bytes(view, ptr) {
      const iovec = new _Ciovec();
      iovec.buf = view.getUint32(ptr, true);
      iovec.buf_len = view.getUint32(ptr + 4, true);
      return iovec;
    }
    static read_bytes_array(view, ptr, len) {
      const iovecs = [];
      for (let i = 0; i < len; i++) {
        iovecs.push(_Ciovec.read_bytes(view, ptr + 8 * i));
      }
      return iovecs;
    }
  };
  var WHENCE_SET = 0;
  var WHENCE_CUR = 1;
  var WHENCE_END = 2;
  var FILETYPE_REGULAR_FILE = 4;
  var FDFLAGS_APPEND = 1 << 0;
  var FDFLAGS_DSYNC = 1 << 1;
  var FDFLAGS_NONBLOCK = 1 << 2;
  var FDFLAGS_RSYNC = 1 << 3;
  var FDFLAGS_SYNC = 1 << 4;
  var Fdstat = class {
    write_bytes(view, ptr) {
      view.setUint8(ptr, this.fs_filetype);
      view.setUint16(ptr + 2, this.fs_flags, true);
      view.setBigUint64(ptr + 8, this.fs_rights_base, true);
      view.setBigUint64(ptr + 16, this.fs_rights_inherited, true);
    }
    constructor(filetype, flags) {
      this.fs_rights_base = 0n;
      this.fs_rights_inherited = 0n;
      this.fs_filetype = filetype;
      this.fs_flags = flags;
    }
  };
  var FSTFLAGS_ATIM = 1 << 0;
  var FSTFLAGS_ATIM_NOW = 1 << 1;
  var FSTFLAGS_MTIM = 1 << 2;
  var FSTFLAGS_MTIM_NOW = 1 << 3;
  var OFLAGS_CREAT = 1 << 0;
  var OFLAGS_DIRECTORY = 1 << 1;
  var OFLAGS_EXCL = 1 << 2;
  var OFLAGS_TRUNC = 1 << 3;
  var Filestat = class {
    write_bytes(view, ptr) {
      view.setBigUint64(ptr, this.dev, true);
      view.setBigUint64(ptr + 8, this.ino, true);
      view.setUint8(ptr + 16, this.filetype);
      view.setBigUint64(ptr + 24, this.nlink, true);
      view.setBigUint64(ptr + 32, this.size, true);
      view.setBigUint64(ptr + 38, this.atim, true);
      view.setBigUint64(ptr + 46, this.mtim, true);
      view.setBigUint64(ptr + 52, this.ctim, true);
    }
    constructor(filetype, size) {
      this.dev = 0n;
      this.ino = 0n;
      this.nlink = 0n;
      this.atim = 0n;
      this.mtim = 0n;
      this.ctim = 0n;
      this.filetype = filetype;
      this.size = size;
    }
  };
  var EVENTRWFLAGS_FD_READWRITE_HANGUP = 1 << 0;
  var SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1 << 0;
  var RIFLAGS_RECV_PEEK = 1 << 0;
  var RIFLAGS_RECV_WAITALL = 1 << 1;
  var ROFLAGS_RECV_DATA_TRUNCATED = 1 << 0;
  var SDFLAGS_RD = 1 << 0;
  var SDFLAGS_WR = 1 << 1;

  // node_modules/@bjorn3/browser_wasi_shim/dist/debug.js
  var Debug = class Debug2 {
    enable(enabled) {
      this.log = createLogger(enabled === void 0 ? true : enabled, this.prefix);
    }
    get enabled() {
      return this.isEnabled;
    }
    constructor(isEnabled) {
      this.isEnabled = isEnabled;
      this.prefix = "wasi:";
      this.enable(isEnabled);
    }
  };
  function createLogger(enabled, prefix) {
    if (enabled) {
      const a = console.log.bind(console, "%c%s", "color: #265BA0", prefix);
      return a;
    } else {
      return () => {
      };
    }
  }
  var debug = new Debug(false);

  // node_modules/@bjorn3/browser_wasi_shim/dist/wasi.js
  var WASIProcExit = class extends Error {
    constructor(code) {
      super("exit with exit code " + code);
      this.code = code;
    }
  };
  var WASI = class WASI2 {
    start(instance) {
      this.inst = instance;
      try {
        instance.exports._start();
      } catch (e) {
        if (e instanceof WASIProcExit) {
          return e.code;
        } else {
          throw e;
        }
      }
    }
    initialize(instance) {
      this.inst = instance;
      instance.exports._initialize();
    }
    constructor(args, env, fds, options = {}) {
      this.args = [];
      this.env = [];
      this.fds = [];
      debug.enable(options.debug);
      this.args = args;
      this.env = env;
      this.fds = fds;
      const self2 = this;
      this.wasiImport = { args_sizes_get(argc, argv_buf_size) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        buffer.setUint32(argc, self2.args.length, true);
        let buf_size = 0;
        for (const arg of self2.args) {
          buf_size += arg.length + 1;
        }
        buffer.setUint32(argv_buf_size, buf_size, true);
        debug.log(buffer.getUint32(argc, true), buffer.getUint32(argv_buf_size, true));
        return 0;
      }, args_get(argv, argv_buf) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        const orig_argv_buf = argv_buf;
        for (let i = 0; i < self2.args.length; i++) {
          buffer.setUint32(argv, argv_buf, true);
          argv += 4;
          const arg = new TextEncoder().encode(self2.args[i]);
          buffer8.set(arg, argv_buf);
          buffer.setUint8(argv_buf + arg.length, 0);
          argv_buf += arg.length + 1;
        }
        if (debug.enabled) {
          debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_argv_buf, argv_buf)));
        }
        return 0;
      }, environ_sizes_get(environ_count, environ_size) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        buffer.setUint32(environ_count, self2.env.length, true);
        let buf_size = 0;
        for (const environ of self2.env) {
          buf_size += environ.length + 1;
        }
        buffer.setUint32(environ_size, buf_size, true);
        debug.log(buffer.getUint32(environ_count, true), buffer.getUint32(environ_size, true));
        return 0;
      }, environ_get(environ, environ_buf) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        const orig_environ_buf = environ_buf;
        for (let i = 0; i < self2.env.length; i++) {
          buffer.setUint32(environ, environ_buf, true);
          environ += 4;
          const e = new TextEncoder().encode(self2.env[i]);
          buffer8.set(e, environ_buf);
          buffer.setUint8(environ_buf + e.length, 0);
          environ_buf += e.length + 1;
        }
        if (debug.enabled) {
          debug.log(new TextDecoder("utf-8").decode(buffer8.slice(orig_environ_buf, environ_buf)));
        }
        return 0;
      }, clock_res_get(id, res_ptr) {
        let resolutionValue;
        switch (id) {
          case CLOCKID_MONOTONIC: {
            resolutionValue = 5000n;
            break;
          }
          case CLOCKID_REALTIME: {
            resolutionValue = 1000000n;
            break;
          }
          default:
            return ERRNO_NOSYS;
        }
        const view = new DataView(self2.inst.exports.memory.buffer);
        view.setBigUint64(res_ptr, resolutionValue, true);
        return ERRNO_SUCCESS;
      }, clock_time_get(id, precision, time) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        if (id === CLOCKID_REALTIME) {
          buffer.setBigUint64(time, BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n, true);
        } else if (id == CLOCKID_MONOTONIC) {
          let monotonic_time;
          try {
            monotonic_time = BigInt(Math.round(performance.now() * 1e6));
          } catch (e) {
            monotonic_time = 0n;
          }
          buffer.setBigUint64(time, monotonic_time, true);
        } else {
          buffer.setBigUint64(time, 0n, true);
        }
        return 0;
      }, fd_advise(fd, offset, len, advice) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_advise(offset, len, advice);
        } else {
          return ERRNO_BADF;
        }
      }, fd_allocate(fd, offset, len) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_allocate(offset, len);
        } else {
          return ERRNO_BADF;
        }
      }, fd_close(fd) {
        if (self2.fds[fd] != void 0) {
          const ret = self2.fds[fd].fd_close();
          self2.fds[fd] = void 0;
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_datasync(fd) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_datasync();
        } else {
          return ERRNO_BADF;
        }
      }, fd_fdstat_get(fd, fdstat_ptr) {
        if (self2.fds[fd] != void 0) {
          const { ret, fdstat } = self2.fds[fd].fd_fdstat_get();
          if (fdstat != null) {
            fdstat.write_bytes(new DataView(self2.inst.exports.memory.buffer), fdstat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_fdstat_set_flags(fd, flags) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_fdstat_set_flags(flags);
        } else {
          return ERRNO_BADF;
        }
      }, fd_fdstat_set_rights(fd, fs_rights_base, fs_rights_inheriting) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting);
        } else {
          return ERRNO_BADF;
        }
      }, fd_filestat_get(fd, filestat_ptr) {
        if (self2.fds[fd] != void 0) {
          const { ret, filestat } = self2.fds[fd].fd_filestat_get();
          if (filestat != null) {
            filestat.write_bytes(new DataView(self2.inst.exports.memory.buffer), filestat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_filestat_set_size(fd, size) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_filestat_set_size(size);
        } else {
          return ERRNO_BADF;
        }
      }, fd_filestat_set_times(fd, atim, mtim, fst_flags) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_filestat_set_times(atim, mtim, fst_flags);
        } else {
          return ERRNO_BADF;
        }
      }, fd_pread(fd, iovs_ptr, iovs_len, offset, nread_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          const { ret, nread } = self2.fds[fd].fd_pread(buffer8, iovecs, offset);
          buffer.setUint32(nread_ptr, nread, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_prestat_get(fd, buf_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const { ret, prestat } = self2.fds[fd].fd_prestat_get();
          if (prestat != null) {
            prestat.write_bytes(buffer, buf_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_prestat_dir_name(fd, path_ptr, path_len) {
        if (self2.fds[fd] != void 0) {
          const { ret, prestat_dir_name } = self2.fds[fd].fd_prestat_dir_name();
          if (prestat_dir_name != null) {
            const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
            buffer8.set(prestat_dir_name, path_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_pwrite(fd, iovs_ptr, iovs_len, offset, nwritten_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          const { ret, nwritten } = self2.fds[fd].fd_pwrite(buffer8, iovecs, offset);
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_read(fd, iovs_ptr, iovs_len, nread_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          const { ret, nread } = self2.fds[fd].fd_read(buffer8, iovecs);
          buffer.setUint32(nread_ptr, nread, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_readdir(fd, buf, buf_len, cookie, bufused_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          let bufused = 0;
          while (true) {
            const { ret, dirent } = self2.fds[fd].fd_readdir_single(cookie);
            if (ret != 0) {
              buffer.setUint32(bufused_ptr, bufused, true);
              return ret;
            }
            if (dirent == null) {
              break;
            }
            if (buf_len - bufused < dirent.head_length()) {
              bufused = buf_len;
              break;
            }
            const head_bytes = new ArrayBuffer(dirent.head_length());
            dirent.write_head_bytes(new DataView(head_bytes), 0);
            buffer8.set(new Uint8Array(head_bytes).slice(0, Math.min(head_bytes.byteLength, buf_len - bufused)), buf);
            buf += dirent.head_length();
            bufused += dirent.head_length();
            if (buf_len - bufused < dirent.name_length()) {
              bufused = buf_len;
              break;
            }
            dirent.write_name_bytes(buffer8, buf, buf_len - bufused);
            buf += dirent.name_length();
            bufused += dirent.name_length();
            cookie = dirent.d_next;
          }
          buffer.setUint32(bufused_ptr, bufused, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      }, fd_renumber(fd, to) {
        if (self2.fds[fd] != void 0 && self2.fds[to] != void 0) {
          const ret = self2.fds[to].fd_close();
          if (ret != 0) {
            return ret;
          }
          self2.fds[to] = self2.fds[fd];
          self2.fds[fd] = void 0;
          return 0;
        } else {
          return ERRNO_BADF;
        }
      }, fd_seek(fd, offset, whence, offset_out_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const { ret, offset: offset_out } = self2.fds[fd].fd_seek(offset, whence);
          buffer.setBigInt64(offset_out_ptr, offset_out, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_sync(fd) {
        if (self2.fds[fd] != void 0) {
          return self2.fds[fd].fd_sync();
        } else {
          return ERRNO_BADF;
        }
      }, fd_tell(fd, offset_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const { ret, offset } = self2.fds[fd].fd_tell();
          buffer.setBigUint64(offset_ptr, offset, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          const { ret, nwritten } = self2.fds[fd].fd_write(buffer8, iovecs);
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, path_create_directory(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self2.fds[fd].path_create_directory(path);
        }
      }, path_filestat_get(fd, flags, path_ptr, path_len, filestat_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          const { ret, filestat } = self2.fds[fd].path_filestat_get(flags, path);
          if (filestat != null) {
            filestat.write_bytes(buffer, filestat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, path_filestat_set_times(fd, flags, path_ptr, path_len, atim, mtim, fst_flags) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self2.fds[fd].path_filestat_set_times(flags, path, atim, mtim, fst_flags);
        } else {
          return ERRNO_BADF;
        }
      }, path_link(old_fd, old_flags, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[old_fd] != void 0 && self2.fds[new_fd] != void 0) {
          const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
          const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
          return self2.fds[new_fd].path_link(old_fd, old_flags, old_path, new_path);
        } else {
          return ERRNO_BADF;
        }
      }, path_open(fd, dirflags, path_ptr, path_len, oflags, fs_rights_base, fs_rights_inheriting, fd_flags, opened_fd_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          debug.log(path);
          const { ret, fd_obj } = self2.fds[fd].path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fd_flags);
          if (ret != 0) {
            return ret;
          }
          self2.fds.push(fd_obj);
          const opened_fd = self2.fds.length - 1;
          buffer.setUint32(opened_fd_ptr, opened_fd, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      }, path_readlink(fd, path_ptr, path_len, buf_ptr, buf_len, nread_ptr) {
        const buffer = new DataView(self2.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          debug.log(path);
          const { ret, data } = self2.fds[fd].path_readlink(path);
          if (data != null) {
            if (data.length > buf_len) {
              buffer.setUint32(nread_ptr, 0, true);
              return ERRNO_BADF;
            }
            buffer8.set(data, buf_ptr);
            buffer.setUint32(nread_ptr, data.length, true);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      }, path_remove_directory(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self2.fds[fd].path_remove_directory(path);
        } else {
          return ERRNO_BADF;
        }
      }, path_rename(fd, old_path_ptr, old_path_len, new_fd, new_path_ptr, new_path_len) {
        throw "FIXME what is the best abstraction for this?";
      }, path_symlink(old_path_ptr, old_path_len, fd, new_path_ptr, new_path_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const old_path = new TextDecoder("utf-8").decode(buffer8.slice(old_path_ptr, old_path_ptr + old_path_len));
          const new_path = new TextDecoder("utf-8").decode(buffer8.slice(new_path_ptr, new_path_ptr + new_path_len));
          return self2.fds[fd].path_symlink(old_path, new_path);
        } else {
          return ERRNO_BADF;
        }
      }, path_unlink_file(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        if (self2.fds[fd] != void 0) {
          const path = new TextDecoder("utf-8").decode(buffer8.slice(path_ptr, path_ptr + path_len));
          return self2.fds[fd].path_unlink_file(path);
        } else {
          return ERRNO_BADF;
        }
      }, poll_oneoff(in_, out, nsubscriptions) {
        throw "async io not supported";
      }, proc_exit(exit_code) {
        throw new WASIProcExit(exit_code);
      }, proc_raise(sig) {
        throw "raised signal " + sig;
      }, sched_yield() {
      }, random_get(buf, buf_len) {
        const buffer8 = new Uint8Array(self2.inst.exports.memory.buffer);
        for (let i = 0; i < buf_len; i++) {
          buffer8[buf + i] = Math.random() * 256 | 0;
        }
      }, sock_recv(fd, ri_data, ri_flags) {
        throw "sockets not supported";
      }, sock_send(fd, si_data, si_flags) {
        throw "sockets not supported";
      }, sock_shutdown(fd, how) {
        throw "sockets not supported";
      }, sock_accept(fd, flags) {
        throw "sockets not supported";
      } };
    }
  };

  // node_modules/@bjorn3/browser_wasi_shim/dist/fd.js
  var Fd = class {
    fd_advise(offset, len, advice) {
      return ERRNO_NOTSUP;
    }
    fd_allocate(offset, len) {
      return ERRNO_NOTSUP;
    }
    fd_close() {
      return 0;
    }
    fd_datasync() {
      return ERRNO_NOTSUP;
    }
    fd_fdstat_get() {
      return { ret: ERRNO_NOTSUP, fdstat: null };
    }
    fd_fdstat_set_flags(flags) {
      return ERRNO_NOTSUP;
    }
    fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting) {
      return ERRNO_NOTSUP;
    }
    fd_filestat_get() {
      return { ret: ERRNO_NOTSUP, filestat: null };
    }
    fd_filestat_set_size(size) {
      return ERRNO_NOTSUP;
    }
    fd_filestat_set_times(atim, mtim, fst_flags) {
      return ERRNO_NOTSUP;
    }
    fd_pread(view8, iovs, offset) {
      return { ret: ERRNO_NOTSUP, nread: 0 };
    }
    fd_prestat_get() {
      return { ret: ERRNO_NOTSUP, prestat: null };
    }
    fd_prestat_dir_name() {
      return { ret: ERRNO_NOTSUP, prestat_dir_name: null };
    }
    fd_pwrite(view8, iovs, offset) {
      return { ret: ERRNO_NOTSUP, nwritten: 0 };
    }
    fd_read(view8, iovs) {
      return { ret: ERRNO_NOTSUP, nread: 0 };
    }
    fd_readdir_single(cookie) {
      return { ret: ERRNO_NOTSUP, dirent: null };
    }
    fd_seek(offset, whence) {
      return { ret: ERRNO_NOTSUP, offset: 0n };
    }
    fd_sync() {
      return 0;
    }
    fd_tell() {
      return { ret: ERRNO_NOTSUP, offset: 0n };
    }
    fd_write(view8, iovs) {
      return { ret: ERRNO_NOTSUP, nwritten: 0 };
    }
    path_create_directory(path) {
      return ERRNO_NOTSUP;
    }
    path_filestat_get(flags, path) {
      return { ret: ERRNO_NOTSUP, filestat: null };
    }
    path_filestat_set_times(flags, path, atim, mtim, fst_flags) {
      return ERRNO_NOTSUP;
    }
    path_link(old_fd, old_flags, old_path, new_path) {
      return ERRNO_NOTSUP;
    }
    path_open(dirflags, path, oflags, fs_rights_base, fs_rights_inheriting, fdflags) {
      return { ret: ERRNO_NOTSUP, fd_obj: null };
    }
    path_readlink(path) {
      return { ret: ERRNO_NOTSUP, data: null };
    }
    path_remove_directory(path) {
      return ERRNO_NOTSUP;
    }
    path_rename(old_path, new_fd, new_path) {
      return ERRNO_NOTSUP;
    }
    path_symlink(old_path, new_path) {
      return ERRNO_NOTSUP;
    }
    path_unlink_file(path) {
      return ERRNO_NOTSUP;
    }
  };

  // node_modules/@bjorn3/browser_wasi_shim/dist/fs_core.js
  var OpenFile = class extends Fd {
    fd_fdstat_get() {
      return { ret: 0, fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0) };
    }
    fd_read(view8, iovs) {
      let nread = 0;
      for (const iovec of iovs) {
        if (this.file_pos < this.file.data.byteLength) {
          const slice = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(iovec.buf_len)));
          view8.set(slice, iovec.buf);
          this.file_pos += BigInt(slice.length);
          nread += slice.length;
        } else {
          break;
        }
      }
      return { ret: 0, nread };
    }
    fd_pread(view8, iovs, offset) {
      let nread = 0;
      for (const iovec of iovs) {
        if (offset < this.file.data.byteLength) {
          const slice = this.file.data.slice(Number(offset), Number(offset + BigInt(iovec.buf_len)));
          view8.set(slice, iovec.buf);
          offset += BigInt(slice.length);
          nread += slice.length;
        } else {
          break;
        }
      }
      return { ret: 0, nread };
    }
    fd_seek(offset, whence) {
      let calculated_offset;
      switch (whence) {
        case WHENCE_SET:
          calculated_offset = offset;
          break;
        case WHENCE_CUR:
          calculated_offset = this.file_pos + offset;
          break;
        case WHENCE_END:
          calculated_offset = BigInt(this.file.data.byteLength) + offset;
          break;
        default:
          return { ret: ERRNO_INVAL, offset: 0n };
      }
      if (calculated_offset < 0) {
        return { ret: ERRNO_INVAL, offset: 0n };
      }
      this.file_pos = calculated_offset;
      return { ret: 0, offset: this.file_pos };
    }
    fd_tell() {
      return { ret: 0, offset: this.file_pos };
    }
    fd_write(view8, iovs) {
      let nwritten = 0;
      if (this.file.readonly)
        return { ret: ERRNO_BADF, nwritten };
      for (const iovec of iovs) {
        const buffer = view8.slice(iovec.buf, iovec.buf + iovec.buf_len);
        if (this.file_pos + BigInt(buffer.byteLength) > this.file.size) {
          const old = this.file.data;
          this.file.data = new Uint8Array(Number(this.file_pos + BigInt(buffer.byteLength)));
          this.file.data.set(old);
        }
        this.file.data.set(buffer.slice(0, Number(this.file.size - this.file_pos)), Number(this.file_pos));
        this.file_pos += BigInt(buffer.byteLength);
        nwritten += iovec.buf_len;
      }
      return { ret: 0, nwritten };
    }
    fd_pwrite(view8, iovs, offset) {
      let nwritten = 0;
      if (this.file.readonly)
        return { ret: ERRNO_BADF, nwritten };
      for (const iovec of iovs) {
        const buffer = view8.slice(iovec.buf, iovec.buf + iovec.buf_len);
        if (offset + BigInt(buffer.byteLength) > this.file.size) {
          const old = this.file.data;
          this.file.data = new Uint8Array(Number(offset + BigInt(buffer.byteLength)));
          this.file.data.set(old);
        }
        this.file.data.set(buffer.slice(0, Number(this.file.size - offset)), Number(offset));
        offset += BigInt(buffer.byteLength);
        nwritten += iovec.buf_len;
      }
      return { ret: 0, nwritten };
    }
    fd_filestat_get() {
      return { ret: 0, filestat: this.file.stat() };
    }
    constructor(file) {
      super();
      this.file_pos = 0n;
      this.file = file;
    }
  };
  var File = class {
    open(fd_flags) {
      const file = new OpenFile(this);
      if (fd_flags & FDFLAGS_APPEND)
        file.fd_seek(0n, WHENCE_END);
      return file;
    }
    get size() {
      return BigInt(this.data.byteLength);
    }
    stat() {
      return new Filestat(FILETYPE_REGULAR_FILE, this.size);
    }
    truncate() {
      if (this.readonly)
        return ERRNO_PERM;
      this.data = new Uint8Array([]);
      return ERRNO_SUCCESS;
    }
    constructor(data, options) {
      this.data = new Uint8Array(data);
      this.readonly = !!options?.readonly;
    }
  };

  // src/wasi.ts
  function initLegacyFetch(sab) {
    let nextFileDescriptor = 1;
    const responseBodyMap = /* @__PURE__ */ new Map();
    const responseHeaderMap = /* @__PURE__ */ new Map();
    const responseWorkerMap = /* @__PURE__ */ new Map();
    function generateFileDescriptor() {
      return nextFileDescriptor++;
    }
    function http_req(urlPtr, urlLen, optsPtr, optsLen, fdPtr) {
      const memory = new Uint8Array(
        (wasmInstance?.exports.memory).buffer
      );
      const urlBytes = memory.slice(urlPtr, urlPtr + urlLen);
      const url = new TextDecoder().decode(urlBytes);
      const optsBytes = memory.slice(optsPtr, optsPtr + optsLen);
      const optsStr = new TextDecoder().decode(optsBytes);
      let opts = {};
      try {
        opts = JSON.parse(optsStr);
      } catch (error) {
        console.log("failed to parse fetch options", error);
      }
      const fd = generateFileDescriptor();
      console.log(`[httpOpen] Opening FD ${fd} for URL: ${url}`);
      const int32 = new Int32Array(sab);
      Atomics.store(int32, 0, 1);
      Atomics.notify(int32, 0);
      console.log("[httpOpen]", "Notify shared worker");
      responseBodyMap.set(fd, new SharedArrayBuffer(4096));
      responseHeaderMap.set(fd, new SharedArrayBuffer(4096));
      new DataView(memory.buffer).setUint8(fdPtr, fd);
      try {
        return 0;
      } catch (error) {
        console.error("HTTP request failed:", error);
        return 1;
      }
    }
    function http_read_body(fd, bufPtr, _bufLen, numPtr) {
      console.log(`[httpReadBody] Reading body with FD: ${fd}`);
      const int32 = new Int32Array(sab);
      console.log(Atomics.wait(int32, 1, 0));
      console.log("done!!!!");
      return 0;
    }
    function http_close(fd) {
      const int32 = new Int32Array(sab);
      return 0;
    }
    return {
      blockless_http: {
        http_req,
        http_read_body,
        http_close
      }
    };
  }

  // src/wasm.ts
  var wasmInstance = null;
  onmessage = (event) => {
    const { eventType, eventData, eventId, sab } = event.data;
    const args = [];
    const env = [];
    const fds = [
      new OpenFile(new File([])),
      // stdin
      new OpenFile(new File([])),
      // stdout
      new OpenFile(new File([]))
      // stderr
    ];
    const wasi = new WASI(args, env, fds);
    WebAssembly.instantiateStreaming(fetch("../index.wasm"), {
      wasi_snapshot_preview1: wasi.wasiImport,
      ...initLegacyFetch(sab)
    }).then((instantiatedModule) => {
      const wasmExports = instantiatedModule.instance.exports;
      wasmInstance = instantiatedModule.instance;
      try {
        wasi.start(instantiatedModule.instance);
      } catch (error) {
        console.log("cant start wasi", error);
      }
      console.log("stdout", new TextDecoder().decode(fds[1].file.data));
      console.log("stderr", new TextDecoder().decode(fds[2].file.data));
      self.postMessage({
        eventType: "INITIALISED",
        eventData: Object.keys(wasmExports)
      });
    });
  };
})();
